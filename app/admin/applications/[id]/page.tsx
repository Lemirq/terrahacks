import { createClient } from "@/utils/supabase/server";
import React from "react";
import countries from "@/data/countries.json";
import ReviewApplication from "./ReviewApplication";
const Application = async ({ params }: { params: { id: string } }) => {
  const supabase = createClient();
  const fetchApplication = async () => {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("user_id", params.id)
      .single();
    if (error) {
      console.error(error);
      return;
    }
    return data;
  };

  const { data: user, error } = await supabase.auth.getUser();

  const data = await fetchApplication();

  const setToNotStarted = async () => {
    if (data?.status === "not_started") {
      await supabase
        .from("applications")
        .update({ status: "in_progress", reviewedBy: user.user?.id })
        .eq("user_id", params.id);
    }
  };
  setToNotStarted();

  const fetchPublicURL = async () => {
    if (!data?.resume_url) return;
    const { data: url } = supabase.storage
      .from("resumes")
      .getPublicUrl(data?.resume_url);
    return url.publicUrl;
  };
  const url = await fetchPublicURL();
  if (!data) {
    return <div className="text-3xl">No Application found.</div>;
  }
  const formatSocialLink = (url: string | null) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };
  return (
    <div className="fc gap-3 items-start w-full">
      <ReviewApplication
        adminEmail={user.user?.email}
        data={data}
        id={params.id}
        url={url}
      />

      <div className="w-full fc gap-10">
        <Section title="Short Answers">
          <div className="col-span-4 w-full fc gap-5">
            <Viewer
              question="Tell us the story of how you began in the computer science field."
              answer={data.short_ans_1}
            />
            <Viewer
              question="Tell us the biggest challenge you have ever faced (doesn't have to be related to computer science)."
              answer={data.short_ans_2}
            />
          </div>
        </Section>
        <Section title="Personal">
          <Viewer question="First Name" answer={data.first_name} />
          <Viewer question="Last Name" answer={data.last_name} />
          <Viewer question="Email" answer={data.email} />
          <Viewer question="Phone" answer={data.phone?.toString() || "N/A"} />
          <Viewer
            question="Country"
            answer={countries.find((c) => c.code === data.country)?.name}
          />
          <Viewer question="Gender" answer={data.gender} />
          <Viewer question="Age" answer={data.age.toString()} />
        </Section>

        <Section title="School">
          <Viewer question="Level of Study" answer={data.level_of_study} />
          <Viewer
            question="Graduation Year"
            answer={data.graduation?.toString() || "N/A"}
          />
          <Viewer question="Major" answer={data.major || "N/A"} />
        </Section>

      <Section title="Experience">
          <Viewer
              question="Hackathons Attended"
              answer={data.hackathons_attended.toString()}
          />
        {data.confidence &&
            <><Viewer
              question="Top Interests"
              answer={data.top_interests.join(", ")}
          />
          <Viewer
              question="Confidence in AI/ML"
              answer={data.confidence.confidence_ai_machine_learning}
          />
          <Viewer
              question="Confidence in Back End Dev"
              answer={data.confidence.confidence_back_end_dev}
          />
          <Viewer
              question="Confidence in Cybersecurity"
              answer={data.confidence.confidence_cybersecurity}
          />
          <Viewer
              question="Confidence in Front End Dev"
              answer={data.confidence.confidence_front_end_dev}
          />
          <Viewer
              question="Confidence in Fullstack Dev"
              answer={data.confidence.confidence_fullstack_dev}
          />
          <Viewer
              question="Confidence in Product Management"
              answer={data.confidence.confidence_product_management}
          />
          <Viewer
              question="Confidence in UI/UX Design"
              answer={data.confidence.confidence_ui_ux_design}
          />
          <Viewer
              question="Confidence in Web3/Crypto/Blockchain"
              answer={data.confidence.confidence_web3_crypto_blockchain}
          />
        </>
        }
        </Section>

        {data.social && (
          <Section title="Social">
            <Viewer
              question="Github"
              answer={
                data.social.github && (
                  <a
                    target="blank"
                    className="text-blue-500 underline"
                    href={formatSocialLink(data.social.github)}
                  >
                    {formatSocialLink(data.social.github)}
                  </a>
                )
              }
            />
            <Viewer
              question="LinkedIn"
              answer={
                data.social.linkedin && (
                  <a
                    target="blank"
                    className="text-blue-500 underline"
                    href={formatSocialLink(data.social.linkedin)}
                  >
                    {formatSocialLink(data.social.linkedin)}
                  </a>
                )
              }
            />
            <Viewer
              question="Twitter"
              answer={
                data.social.twitter && (
                  <a
                    target="blank"
                    className="text-blue-500 underline"
                    href={formatSocialLink(data.social.twitter)}
                  >
                    {formatSocialLink(data.social.twitter)}
                  </a>
                )
              }
            />
            <Viewer
              question="Instagram"
              answer={
                data.social.instagram && (
                  <a
                    target="blank"
                    className="text-blue-500 underline"
                    href={formatSocialLink(data.social.instagram)}
                  >
                    {formatSocialLink(data.social.instagram)}
                  </a>
                )
              }
            />
            <Viewer
              question="Portfolio"
              answer={
                data.social.portfolio && (
                  <a
                    target="blank"
                    className="text-blue-500 underline"
                    href={formatSocialLink(data.social.portfolio)}
                  >
                    {formatSocialLink(data.social.portfolio)}
                  </a>
                )
              }
            />
          </Section>
        )}
      </div>
    </div>
  );
};
const Viewer = ({
  question,
  answer,
}: {
  question: string;
  answer: React.ReactNode | string | null;
}) => {
  return (
    <div className="fc items-start gap-2 w-full">
      <p className="text-lg font-bold">{question}</p>
      {answer || "N/A"}
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="fc gap-5 w-full items-start">
      <h2 className="text-3xl font-bold">{title}</h2>
      <div className="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
        {children}
      </div>
    </div>
  );
};

export default Application;
