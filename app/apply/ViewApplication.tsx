import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
interface Props {
  age: number;
  complete: boolean | null;
  confidence: {
    confidence_ai_machine_learning: string;
    confidence_back_end_dev: string;
    confidence_cybersecurity: string;
    confidence_front_end_dev: string;
    confidence_fullstack_dev: string;
    confidence_product_management: string;
    confidence_ui_ux_design: string;
    confidence_web3_crypto_blockchain: string;
  };
  country: string;
  created_at: string;
  email: string;
  first_name: string;
  gender: string;
  graduation: number | null;
  hackathons_attended: number;
  id: string;
  last_name: string;
  level_of_study: string;
  major: string | null;
  phone: number | null;
  resume_url: string | null;
  short_ans_1: string;
  short_ans_2: string;
  social: {
    github: string;
    linkedin: string;
    instagram: string;
    twitter: string;
    portfolio: string;
  };
  top_interests: string[];
  user_id: string | null;
}

const ViewApplication = ({
  data,
  resume,
}: {
  data: Props;
  resume?: { name: string; url: string } | null;
}) => {
  return (
    <main className="w-full min-h-screen overflow-hidden relative py-36 fc justify-start">
      <div className="max-w-7xl w-full fc gap-10 sm:px-10 px-5">
        <div className="w-full fr justify-start">
          <Link href="/dashboard">
            <Button color="primary" startContent={<IoArrowBack />}>
              Back to Dashboard
            </Button>
          </Link>
        </div>
        <Section title="Personal">
          <Viewer question="First Name" answer={data.first_name} />
          <Viewer question="Last Name" answer={data.last_name} />
          <Viewer question="Email" answer={data.email} />
          {data.phone && (
            <Viewer question="Phone" answer={data.phone&&data.phone?.toString()} />
          )}
          <Viewer question="Country" answer={data.country} />
          <Viewer question="Gender" answer={data.gender} />
          <Viewer question="Age" answer={data.age&&data.age.toString()} />
        </Section>

        <Section title="School">
          <Viewer question="Level of Study" answer={data.level_of_study} />
          <Viewer
            question="Graduation Year"
            answer={data.graduation&&data.graduation?.toString()}
          />
          {data.major && <Viewer question="Major" answer={data.major} />}
        </Section>

        <Section title="Experience">
          <Viewer
            question="Hackathons Attended"
            answer={data.hackathons_attended&&data.hackathons_attended.toString()}
          />
          <Viewer
            question="Top Interests"
            answer={data.top_interests.join(", ")}
          />
          {data.confidence && (
            <>
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
          )}
        </Section>

        <Section title="Social">
          <Viewer question="Github" answer={data.social.github} />
          <Viewer question="LinkedIn" answer={data.social.linkedin} />
          <Viewer question="Instagram" answer={data.social.instagram} />
          <Viewer question="Twitter" answer={data.social.twitter} />
          <Viewer question="Portfolio" answer={data.social.portfolio} />
          <Viewer
            question="Resume"
            answer={
              resume && (
                <a href={resume.url} target="blank">
                  <span className="text-blue-400 underline underline-offset-2">
                    {resume.name}
                  </span>{" "}
                  Uploaded
                </a>
              )
            }
          />
        </Section>

        {data.short_ans_1 ||
          (data.short_ans_2 && (
            <Section title="Short Answers">
              <div className="col-span-4 w-full fc gap-5">
                {data.short_ans_1 && (
                  <Viewer
                    question="Tell us the story of how you began in the computer science field."
                    answer={data.short_ans_1}
                  />
                )}
                <Viewer
                  question="Tell us the biggest challenge you have ever faced (doesn't have to be related to computer science)."
                  answer={data.short_ans_2}
                />
              </div>
            </Section>
          ))}
      </div>
    </main>
  );
};

const Viewer = ({
  question,
  answer,
}: {
  question: string;
  answer: React.ReactNode | string | null | undefined;
}) => {
  return (
    <div className="fc items-start gap-2 w-full">
      <p className="text-lg font-bold">{question}</p>
      {answer && <p>{answer}</p>}
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
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {children}
      </div>
    </div>
  );
};

export default ViewApplication;
