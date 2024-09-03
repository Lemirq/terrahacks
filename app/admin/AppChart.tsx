import { Tables } from "@/database.types";
import React from "react";
import Chart, { Props } from "react-apexcharts";

const AppChart = ({
  applications,
}: {
  applications: Tables<"applications">[];
}) => {
  console.log(applications);
  // transfrom data

  // users is an array of objects
  //EXAMPLE: {
  //   id: 209,
  //   name: 'Muhammad Rayan',
  //   email: 'rayankhanyt@gmail.com',
  //   created_at: '2024-07-30T21:03:20.3116+00:00'
  // },
  // Group by day and count

  let newUsers = applications.reduce((acc: any, user: any) => {
    const date = new Date(user.created_at).toDateString();
    if (acc[date]) {
      acc[date] += 1;
    } else {
      acc[date] = 1;
    }
    return acc;
  }, {});

  // Sorting the newUsers object by date
  newUsers = Object.keys(newUsers)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .reduce((acc: any, key: string) => {
      acc[key] = newUsers[key];
      return acc;
    }, {});

  console.log(newUsers);
  const series: Props["series"] = [
    {
      name: "Applications",
      data: Object.values(newUsers).map((value) => value.toString()),
    },
  ];

  const options: Props["options"] = {
    tooltip: {
      enabled: true,
      theme: "dark",
    },
    stroke: {
      curve: "straight",
      width: 3,
    },
    chart: {
      fontFamily: "inherit",
      zoom: {
        enabled: false,
      },
      foreColor: "#fff",
      type: "bar",
      height: 350,
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Applications started by day",
      align: "left",
    },
    grid: {
      row: {
        colors: ["transparent"], // takes an array which will be repeated on columns
        opacity: 0.1,
      },
    },
    xaxis: {
      categories: Object.keys(newUsers),
    },
  };

  return (
    <>
      <div className="w-full z-10 bg-neutral-800 rounded-md p-3">
        <div id="chart">
          <Chart options={options} series={series} type="line" height={425} />
        </div>
      </div>
    </>
  );
};

export default AppChart;
