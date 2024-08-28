import {
  getAllCategories,
  getAllFAQs,
  getWaitlist,
} from "@/utils/supabase/actions";
import Dashboard from "./Dashboard";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const Home = async () => {
  const waitlist = await getWaitlist();
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data) {
    redirect("/login");
  }

  // fetch insights for the dashboard
  const insights = [];

  // fetch total users
  const users = await supabase.from("users").select("*");

  // fetch all applications
  const applications = await supabase.from("applications").select("*");

  if (applications.error || users.error) {
    console.error(applications.error || users.error);
    return <div>Something went wrong</div>;
  }

  const acceptedApplications = applications.data.filter(
    (application) => application.status === "accepted",
  );
  const rejectedApplications = applications.data.filter(
    (application) => application.status === "rejected",
  );

  const incompleteApplications = applications.data.filter(
    (application) => !application.complete,
  );

  if (users && applications) {
    insights.push({
      title: "Total Users",
      value: users.data.length,
    });

    insights.push({
      title: "Total Applications",
      value: applications.data.length,
    });

    insights.push({
      title: "Incomplete Applications",
      value: `${incompleteApplications.length} | ${(
        (incompleteApplications.length / applications.data.length) *
        100
      ).toFixed(0)}%`,
    });

    insights.push({
      title: "Complete Applications",
      value: `${applications.data.length - incompleteApplications.length} | ${(
        ((applications.data.length - incompleteApplications.length) /
          applications.data.length) *
        100
      ).toFixed(0)}%`,
    });

    // percentage of signups vs applications

    insights.push({
      title: "Signups vs Applications",
      value: `${((applications.data.length / users.data.length) * 100).toFixed(2)}%`,
    });

    insights.push({
      title: "Accepted Applications",
      value: acceptedApplications.length,
    });

    insights.push({
      title: "Rejected Applications",
      value: rejectedApplications.length,
    });
  }

  return <Dashboard insights={insights} users={users.data} />;
};
export default Home;
