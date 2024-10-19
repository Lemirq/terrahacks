"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { IoVideocamOutline } from "react-icons/io5";
const Schedule = () => {
  const dates = ["October 19", "October 20", "October 21"];
  // const [day, setDay] = useState("October 19");
  // const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   setIndex(dates.indexOf(day));
  // }, [day]);

  const schedule: {
    [key: string]: {
      [key: string]: string | string[] | { title: string; meeting: string }[];
    };
  }[] = [
    {
      "October 19, 2024": {
        "12:00 P.M.": ["Live Opening Video", "Hacking Begins"],
        "2:00 P.M.": "First Mentoring Session (Finding and Starting a project)",
        "2:30 P.M. - 3:30 P.M.": {
          title: "CoCalc: Collaborative Calculation",
          meeting:
            "https://teams.microsoft.com/meet/218233667539?p=rtVZjjp8BFYmYwWyox",
        },
        "4:00 P.M. - 5:00 P.M.": [
          {
            title: "Prompt Engineering 101",
            meeting:
              "https://teams.microsoft.com/meet/250940307476?p=Sy2wSlDo51JDC0UUWf",
          },
        ],
        "7:30 P.M. - 8:30 P.M.":
          "Mentoring Session (Getting your project Organized)",
        "9:00 P.M. - 10:00 P.M.": [
          {
            title: "From Idea to Impact: Building an MVP That Matters",
            meeting:
              "https://teams.microsoft.com/meet/252442675691?p=wPXdpll8bqZmAtZTfL",
          },
        ],
      },
      "October 20, 2024": {
        "10:00 A.M. - 11:00 A.M.": [
          {
            title: "Design Thinking in Hackathons: From Concept to Creation",
            meeting:
              "https://teams.microsoft.com/meet/277081493505?p=vRPYxQxSjGzcczBPGO",
          },
        ],
        "11:00 A.M. - 12:00 P.M.": [
          {
            title: "Quantum Computing 101",
            meeting:
              "https://teams.microsoft.com/meet/273470931632?p=9m7bDm4ABw9ETYNbxf",
          },
        ],
        "2:00 P.M. - 3:00 P.M.": [
          "Mentoring Session (Logic Issues)",
          {
            title: "Hacking Your Career: Maximizing your job search success",
            meeting:
              "https://teams.microsoft.com/meet/260753223057?p=bgR8MCmMOGtJT0sWle",
          },
        ],
        "3:00 P.M. - 4:00 P.M.": [
          {
            title: "Intro to Vision Language and Stable Diffusion Models",
            meeting:
              "https://teams.microsoft.com/meet/262571077943?p=asGBdZ5hXq7oRebsKP",
          },
        ],
        "6:00 P.M. - 7:00 P.M.": "Mentoring Session (Logic Issues)",
        "9:00 P.M. - 10:00 P.M.": [
          {
            title: "Leveraging LinkedIn and Networking",
            meeting:
              "https://teams.microsoft.com/l/meetup-join/19%3ameeting_MmJhNDVhMDktMTRlMi00ODczLTk4MTItYTMxZjE5MmU5ODZk%40thread.v2/0?context=%7b%22Tid%22%3a%22c109cc70-0687-4ca6-8c1c-c7a9c04938b0%22%2c%22Oid%22%3a%22b63c1ffb-5876-4801-996f-32f82ef2b7d8%22%7d",
          },
        ],
      },
      "October 21, 2024": {
        "11:00 A.M. - 12:00 P.M.": [
          {
            title: "You don't know what you don't know",
            meeting:
              "https://teams.microsoft.com/meet/294240726906?p=79hF3Xb3BcneYDEbH1",
          },
        ],
        "2:00 P.M. - 3:00 P.M.": [
          "Mentoring Session (Putting it All Together)",
          {
            title: "AMA with GitHub Campus Expert NY",
            meeting:
              "https://teams.microsoft.com/meet/276461974078?p=bI8N6Akwoqtv2K97c4",
          },
        ],
        "6:00 P.M. - 7:00 P.M.": [
          {
            title: "AMA with Aidan Ouckama",
            meeting:
              "https://teams.microsoft.com/meet/291621300513?p=BZLWiXwgQc9w8qoeu6",
          },
        ],
        "9:00 P.M. - 10:00 P.M.": "Mentoring Session (Final Touches)",
        "10:00 P.M.": "Hacking Ends",
      },
    },
  ];

  return (
    <section className="w-full py-5 px-5 sm:px-10 fc gap-5 items-start justify-between rounded-2xl border border-zinc-300/30 bg-zinc-900 mt-5">
      <h3 className="text-4xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto tracking-tight font-medium">
        Schedule
      </h3>
      {/* <ChipTabs selected={day} setSelected={setDay} /> */}
      {/* map through schedule and display it */}
      <div className="w-full items-start overflow-x-auto relative">
        <div
          // wrapper for all days to enable horizontal scrolling
          className="fr gap-5"
        >
          {schedule.map((scheduleDay, i) => (
            <div
              key={i}
              className="fc w-full gap-10" // Flex-shrink makes each tab's width fixed for scrolling
              style={{ minWidth: "100%" }} // Ensures each day takes up full width
            >
              {Object.keys(scheduleDay).map((date) => (
                <div className="fc gap-5 items-start" key={date}>
                  <h3 className="text-3xl font-bold">{date}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
                    {Object.keys(scheduleDay[date]).map((time) => (
                      <div
                        className="fc gap-2 items-start h-auto w-full"
                        key={time}
                      >
                        <h4 className="text-2xl font-semibold">{time}</h4>
                        {Array.isArray(scheduleDay[date][time]) ? (
                          <ul className="list-disc list-inside flex-1">
                            {scheduleDay[date][time].map((event) => (
                              <>
                                {event.title ? (
                                  <li
                                    key={event.title}
                                    className="fc items-start gap-3 list-disc"
                                  >
                                    <span>{event.title}</span>
                                    <Link target="_blank" href={event.meeting}>
                                      <Button
                                        startContent={<IoVideocamOutline />}
                                        className="bg-[#494CA4]"
                                      >
                                        Join Meeting
                                      </Button>
                                    </Link>
                                  </li>
                                ) : (
                                  <li key={event}>{event}</li>
                                )}
                              </>
                            ))}
                          </ul>
                        ) : (
                          <p>
                            {scheduleDay[date][time].title
                              ? scheduleDay[date][time].title
                              : scheduleDay[date][time]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
