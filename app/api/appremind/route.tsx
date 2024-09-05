import CompleteApp from "@/emails/complete_app";
import OnlyTake from "@/emails/onlytake";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET(request: NextRequest) {
  // fetch all applications that arent compelte and created_at is less than 5 days
  const supabase = createClient();
  // get user
  const gte = new Date();
  const lte = new Date();
  // gte.setDate(gte.getDate() - 10);
  // lte.setDate(lte.getDate() - 3);

  console.log(gte.toISOString(), lte.toISOString());

  const {
    data: { user },
    error: URROR,
  } = await supabase.auth.getUser();

  if (!user?.email?.endsWith("hack49.com")) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    // filter by created_at one week ago from now
    .eq("complete", false);
  // .gte("created_at", gte.toISOString())
  // .lte("created_at", lte.toISOString());
  if (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occured" }, { status: 500 });
  }
  // fetch from users table
  const getUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.error(error);
      return [];
    }
    return data;
  };

  const users = await getUsers();

  // match user_id col in applications with id in users
  const emails = data.map((app) => {
    const user = users.find((u) => u.uid === app.user_id);
    if (!user) return null;
    return user.email;
  });

  // splice into chunks of 50
  const chunks = [];
  let i = 0;
  while (i < emails.length) {
    chunks.push([...emails.slice(i, i + 49)]);
    i += 49;
  }

  // return NextResponse.json({ emails: chunks });

  const resend = new Resend(process.env.RESEND);
  // for each chunk send email
  const { data: rData, error: rError } = await resend.emails.send({
    from: "Hack49 Team<team@hack49.com>",
    to: "team@hack49.com",
    bcc: chunks[1],
    subject: "Hack49: Applications only take 30 seconds!",
    react: <OnlyTake />,
  });

  if (rError) {
    console.error(rError);
  }

  console.log(rData);

  // send email
  // const { data: rData, error: rError } = await resend.emails.send({
  //   from: "Hack49 Team<team@hack49.com>",
  //   to: emails,
  //   subject: "Hack49: Free domains running out!",
  //   react: <CompleteApp />,
  // });
  //
  return NextResponse.json({ emails: chunks });
}
