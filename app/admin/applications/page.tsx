import { createClient } from "@/utils/supabase/server";
import React from "react";
import AllApps from "./AllApps";

const Applications = async () => {
  const supabase = createClient();
  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error(error);
    }
    return data;
  };
  const allApplications = await fetchApplications();
  const filteredApplications = allApplications?.filter((app) => app.complete);
  if (!allApplications) {
    return <div>Loading...</div>;
  }
  const incomingApplications = allApplications.filter(
    (application) =>
      application.status === "not_started" && application.first_name,
  );
  const acceptedApplications = allApplications.filter(
    (application) => application.status === "accepted",
  );
  const rejectedApplications = allApplications.filter(
    (application) => application.status === "rejected",
  );

  const incompleteApplications = allApplications.filter(
    (application) => !application.complete,
  );

  return (
    <div className="fc gap-3 items-start w-full">
      <h1 className="text-2xl text-center">Applications</h1>
      <div className="w-full fr flex-wrap justify-start gap-4">
        <div className="px-5 py-4 bg-blue-400/40 rounded-2xl whitespace-nowrap">
          <h3 className="font-bold text-xl">{allApplications.length} total</h3>
        </div>
        <div className="px-5 py-4 bg-blue-400/40 rounded-2xl whitespace-nowrap">
          <h3 className="font-bold text-xl">
            {incompleteApplications.length} incomplete
          </h3>
        </div>
        <div className="px-5 py-4 bg-orange-400/40 rounded-2xl whitespace-nowrap">
          <h3 className="font-bold text-xl">
            {allApplications.length - incompleteApplications.length} completed
          </h3>
        </div>
        <div className="px-5 py-4 bg-green-400/40 rounded-2xl whitespace-nowrap">
          <h3 className="font-bold text-xl">
            {acceptedApplications.length} accepted
          </h3>
        </div>
        <div className="px-5 py-4 bg-red-400/40 rounded-2xl whitespace-nowrap">
          <h3 className="font-bold text-xl">
            {rejectedApplications.length} rejected
          </h3>
        </div>
      </div>

      {/* Table with all applications */}
      <AllApps applications={filteredApplications} />
    </div>
  );
};

export default Applications;
