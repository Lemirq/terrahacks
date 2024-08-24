"use client";
import React from "react";
import { Toaster } from "sonner";
import Waitlist from "./Waitlist";
import { User } from "@/node_modules/@supabase/auth-js/src/lib/types";
import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";
import dynamic from "next/dynamic";
const Bro = dynamic(() => import("./Chart"), {
  ssr: false,
});

const Dashboard = ({ insights, users }: { insights: any; users: any }) => {
  // transform insights -> title: "Total Users" into an array grouped by date and value of amount of signups
  // const bro = [
  //   ...insights.find((insight: any) => insight.title === "Total Users").data,
  // ];

  const chartData = [];

  return (
    <div className="w-full h-screen overflow-x-hidden justify-start fc">
      <div className="w-full max-w-7xl fc gap-10">
        <div className="fr gap-3 justify-between w-full">
          <h1 className="text-4xl text-center">Admin Dashboard</h1>
        </div>
        {/* make some UI to view and edit all the FAQS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {insights.map((insight: any) => {
            return (
              <div
                className="bg-neutral-800 p-4 rounded-lg shadow-md fc gap-2 items-start"
                key={insight.title}
              >
                <p className="text-xl">{insight.title}</p>
                <h3 className="text-4xl">{insight.value}</h3>
              </div>
            );
          })}
          <Link
            href="/admin/applications"
            className="bg-neutral-800 p-4 rounded-lg shadow-md fc gap-2 items-start"
          >
            <h3 className="text-2xl fr gap-2">
              View Applications <IoChevronForward />
            </h3>
          </Link>
        </div>
        <Bro users={users} />
      </div>
      <Toaster />
    </div>
  );
};

export default Dashboard;
