import { createClient } from "@/utils/supabase/server";
import { Button } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import React from "react";
import Redeem from "./Redeem";
import Link from "next/link";

const RedeemPage = async ({ params }: { params: { id: string } }) => {
  const supabase = createClient();
  // get user if doesnt exist send to signup
  // get invite if doesnt exist send to 404
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // if (!user) {
  //   redirect("/signup");
  // }

  const { data, error: iError } = await supabase
    .from("invites")
    .select("*")
    .eq("code", params.id);

  if (iError) {
    console.log("invite err");
    console.error(iError);
    return;
  }
  if (!data) {
    return <h1>404</h1>;
  }
  console.log(data);
  console.log("user_id", data[0].invited_by);
  // get application of invite
  const { data: app, error: apperror } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", data[0].invited_by)
    .single();
  if (apperror) {
    console.log("app err");
    console.error(apperror);
    return;
  }

  return (
    <main className="w-full min-h-screen py-36 fc px-5 sm:px-10">
      <div className="w-full min-h-screen max-w-5xl mx-auto fc justify-start items-start h-full gap-2">
        <div className="fc gap-3 items-start sm:justify-between w-full">
          {user ? (
            <>
              <h1 className="text-3xl font-bold">
                Hi, {user.user_metadata.first_name}!
              </h1>
              <p>
                {app.first_name} {app.last_name} has invited you to join Hack49.
              </p>
              <Redeem app={app} user={user} />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold">Hi, there! 👋</h1>
              <p>
                {app.first_name} {app.last_name} has invited you to join Hack49.
                🥳
              </p>
              <p>
                Create a Hack49 account for instant acceptance into the
                hackathon.
              </p>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default RedeemPage;
