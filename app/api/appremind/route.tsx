import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // fetch all applications that arent compelte and created_at is less than 5 days
  const supabase = createClient();
  // get user
  const {
    data: { user },
    error: URROR,
  } = await supabase.auth.getUser();
  console.log(user);
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    // filter by created_at one week ago from now
    .eq("complete", false)
    .lte(
      "created_at",
      new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000),
    );

  console.log(data);

  if (error) {
    return NextResponse.json({
      status: 500,
      body: error,
    });
  }

  return NextResponse.json({
    status: 200,
    body: data,
  });
}
