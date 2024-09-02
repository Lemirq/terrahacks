"use client";
import { Database } from "@/database.types";
import { createClient } from "@/utils/supabase/client";
import { Button, Chip } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import PdfViewer from "./PdfViewer";
import { IoArrowBack, IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const accessibleTo = [
  "vihaan@hack49.com",
  "arjun@hack49.com",
  "prabh@hack49.com",
  "rishi@hack49.com",
];
interface ReviewApplicationProps {
  id: string;
  data: Database["public"]["Tables"]["applications"]["Row"];
  url: string | undefined;
  adminEmail: string;
}
const ReviewApplication = ({
  id,
  data,
  url,
  adminEmail,
}: ReviewApplicationProps) => {
  const supabase = createClient();

  const approve = async () => {
    // fetch referral code
    const { data: refData, error: refError } = await supabase
      .from("referrals")
      .select("*")
      .eq("user_id", id);

    if (refError) {
      console.error(refError);
      toast.error("Failed to fetch referral code");
      return;
    }

    const code = refData[0]?.code;

    // approve application
    await supabase
      .from("applications")
      .update({ status: "accepted" })
      .eq("user_id", id);
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("uid", id)
      .single();
    if (error) {
      console.error(error);
      return;
    }

    toast.success("Application approved!");

    // send email
    const promise = new Promise(async (resolve, reject) => {
      const resp = await fetch("/api/mailing", {
        method: "POST",
        body: JSON.stringify({
          name: data?.firstName,
          email: data?.email,
          type: "accepted",
          code,
        }),
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const response = await resp.json();
      console.log(response);
      if (response.error) {
        reject();
        return;
      }
      resolve(data);
    });

    toast.promise(promise, {
      loading: "Sending email...",
      success: `Email sent!`,
      error: "Failed to send email contact Vihaan",
    });
  };

  const reject = async () => {
    // reject application
    await supabase
      .from("applications")
      .update({ status: "rejected" })
      .eq("user_id", id);
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("uid", id)
      .single();
    if (error) {
      console.error(error);
      return;
    }
    toast.success("Application rejected!");
    // send email
    const fetched = await fetch(window.location.origin + "/api/mailing", {
      method: "POST",
      body: JSON.stringify({
        name: data?.firstName,
        email: data?.email,
        type: "rejected",
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    toast.success("Email sent!");

    console.log(await fetched.json());
  };

  return (
    <div className="w-full gap-4 bg-neutral-800 fc items-start lg:fr lg:justify-between mb-10 rounded-2xl px-5 py-4">
      <Link href="/admin/applications">
        <Button color="primary" startContent={<IoArrowBack />}>
          Back
        </Button>
      </Link>
      <div className="fr gap-3 w-full sm:w-[initial]">
        <h3 className="font-bold text-xl lg:text-2xl">
          {data.first_name} {data.last_name}
        </h3>
        <Chip
          size="sm"
          color={
            data.status === "not_started"
              ? "warning"
              : data.status === "in_progress"
                ? "default"
                : data.status === "accepted"
                  ? "success"
                  : data.status === "rejected"
                    ? "danger"
                    : "default"
          }
        >
          {data.status === "not_started" && "Not Started"}
          {data.status === "in_progress" && "In Progress"}
          {data.status === "accepted" && "Accepted"}
          {data.status === "rejected" && "Rejected"}
        </Chip>
      </div>
      {accessibleTo.includes(adminEmail) && (
        <div className="gap-3 fr flex-wrap justify-start w-full sm:w-[initial]">
          {url && <PdfViewer url={url} />}
          <Button
            isDisabled={
              data.status === "rejected" || data.status === "accepted"
            }
            onClick={approve}
            color="success"
            startContent={<IoCheckmarkCircle />}
          >
            Approve
          </Button>
          <Button
            isDisabled={
              data.status === "rejected" || data.status === "accepted"
            }
            onClick={reject}
            color="danger"
            startContent={<IoCloseCircle />}
          >
            Reject
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewApplication;
