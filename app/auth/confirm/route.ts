import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const supabase = createClient();
    async function makeID(base: string) {
      let result = base;
      if (!base) {
        base = "user";
      }
      let counter = 0;

      // Check if the code already exists
      while (true) {
        const { data: codeExists, error: codeExistsError } = await supabase
          .from("referrals")
          .select("*")
          .eq("code", result);

        if (codeExists && codeExists.length > 0) {
          // If the code exists, append an underscore and a random number
          result = `${base}_${Math.floor(Math.random() * 10000)}`;
        } else {
          // Code is unique, break the loop
          break;
        }

        // Safety to avoid infinite loops (e.g., in case of some unexpected situation)
        if (counter++ > 10) {
          throw new Error("Failed to generate a unique code.");
        }
      }
      return result;
    }

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (error) {
      // redirect user to an error page with some instructions
      console.log(error.message);

      redirect(`/error?message=${error.message}`);
    }
    if (!error) {
      // redirect user to specified redirect URL or root of app
      const c = await makeID(
        data.user?.user_metadata?.first_name.toLowerCase() ?? "",
      );
      const { error: codeError } = await supabase
        .from("referrals")
        .insert({ user_id: data.user?.id, code: c });

      if (codeError) {
        console.error(codeError);
        return NextResponse.json({ error: codeError.message }, { status: 500 });
      }

      redirect("/apply");
    }
  }
}
