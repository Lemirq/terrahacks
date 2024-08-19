"use client";
import React, { useEffect, useState } from "react";
import { User } from "@/node_modules/@supabase/auth-js/src/lib/types";
import { Button, Input } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Tables } from "@/database.types";
import { IoTicket } from "react-icons/io5";
import PrizeTiers from "./PrizeTiers";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import GenerateImgBtn from "./GenerateImgBtn";

const Referral = ({
  user,
  refCode,
  app,
}: {
  user: User;
  app: Tables<"applications">;
  refCode: Tables<"referrals">[];
}) => {
  const [referralCode, setReferralCode] = useState<string>("");
  const [created, setCreated] = useState<boolean>(refCode.length > 0);
  const [code, setCode] = useState<Tables<"referrals">[]>(refCode);

  const [prizesVisible, setPrizesVisible] = useState(false);

  const supabase = createClient();
  const fetchUsedReferrals = async () => {
    const { data, error } = await supabase
      .from("referrals")
      .select("*")
      .eq("user_id", user.id);
    if (error) {
      console.error(error.message);
    }
    if (data) {
      setCode(data);
      setCreated(true);
    }
  };
  const createReferralCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (referralCode.length < 3) {
      toast.error("Referral code must be at least 3 characters long");
      return;
    }

    // create referral code
    const { error } = await supabase
      .from("referrals")
      .insert({ user_id: user.id, code: referralCode });
    if (error) {
      if (error.code === "23505") {
        toast.error("Referral code already exists, pick a different one");
        return;
      }
    }

    setCreated(true);
    toast.success("Referral code created successfully");
    fetchUsedReferrals();
  };

  useEffect(() => {
    console.log("refCode", code);
  }, [code]);

  // useEffect(() => {
  // 	fetchUsedReferrals();
  // }, []);

  const setVisibility = (value: boolean) => {
    setPrizesVisible(value);
  };

  return (
    <section className="w-full rainbow-shadow relative mt-5">
      <AnimatePresence>
        {prizesVisible && <PrizeTiers setVisibility={setVisibility} />}
      </AnimatePresence>
      <div className="rounded-2xl border py-5 px-5 sm:px-10 border-neutral-300/30 w-full bg-neutral-900  relative z-10 fc items-start md:fr md:justify-between gap-10 justify-between">
        <div className="z-10 fc items-start">
          <h3 className="text-3xl font-bold">Referral Raffle</h3>
          <p className="text-lg">
            Refer a friend to get a chance to win a Hack49 t-shirt!
          </p>
          <p>
            After creating a referral code, share it with your friends. When
            they <b>submit an application</b> using your code, you get a ticket
            for the raffle.
          </p>

          {created && code.length > 0 && (
            <button
              className="my-3"
              onClick={() => {
                navigator.clipboard.writeText(code[0].code);
                toast.success("Code copied to clipboard");
              }}
            >
              Your code: <span className="font-bold">{code[0].code}</span>
            </button>
          )}
          <div className="fr gap-2 mt-4">
            {" "}
            <Button onClick={() => setPrizesVisible(true)} color="primary">
              View Tiers
            </Button>
            {app && app.complete && (
              <Link
                href={
                  created
                    ? `/api/generate_img?code=${code[0].code}&mode=applied`
                    : "/api/generate_img?mode=applied"
                }
                target="_blank"
                download="applied.png"
              >
                <Button
                  onClick={() => {
                    // download
                    const link = document.createElement("a");
                    link.href = created
                      ? `/api/generate_img?code=${code[0].code}&mode=applied`
                      : "/api/generate_img?mode=applied";
                    link.download = "applied.png";
                  }}
                  color="primary"
                >
                  Generate Image
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div className="fc gap-2 z-10 w-full">
          <h3 className="text-2xl font-bold">
            {created ? "Referral Tickets" : "Create a referral code"}
          </h3>
          {!created && (
            <form className="fr gap-2 w-full" onSubmit={createReferralCode}>
              <Input
                maxLength={10}
                placeholder="Create referral code..."
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
              <Button isDisabled={!referralCode} type="submit">
                Create
              </Button>
            </form>
          )}
          {created && code[0] && (
            <div className="text-7xl font-bold tracking-tighter fr">
              <IoTicket className="mr-2 text-4xl" />
              {code[0].used}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Referral;
