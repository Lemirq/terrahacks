import { createClient } from "@/utils/supabase/server";
import { Button } from "@nextui-org/react";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";
import ReactMarkdown from "react-markdown";

// EMAILS
// WOLFRAM: Due to the number of hackathons we sponsor we're unable to offer a financial sponsorship for this event, but we’d love to support you in other ways.
// What we offer:
// 1.) Access to Wolfram|One for all your participants for six months. Wolfram|One includes both Desktop and Cloud access, full access to the Wolfram Language and Knowledgebase, FreeCDF Deployment, 5000 Wolfram|Alpha API calls, 5000 Cloud Credits, 2 installations per user and 2 GB of Cloud Storage. The value of this access is $830.00 per user.
// 2.) The Wolfram Award prize for all participants who utilize Wolfram Language as a significant component in their project, verified by a Wolfram mentor at your event.
// This Wolfram Award contains a year of WolframOne, with a retail value of $1,660/year per user. In addition, any student who submits a project utilizing Wolfram Language is eligible for a $500 scholarship to one of our summer programs if they apply and are accepted. Those students may reach out to me for additional details.
// What we need from you:
// 3.) Provide our WolframOne access link and instructions to all of your participants within 72 hours of their individual registration for your event. I'll send you an email that you could forward and that could also be posted on your Discord. Some organizers prefer to add this to their welcome/confirmation email.
// 4.) Place our company logo on your website under Sponsors and send me a link to that page when our logo is added.
// Please select a logo from this page: https://company.wolfram.com/press-center/wolfram-corporate/
// 5.) Commit to sending me the names of each individual participant who wins the Wolfram Award Letter before you send them the award letter, along with the link to their Wolfram-coded project
// 6.) Allow a Wolfram Language expert to participate at your event either in-person or via Discord
// 7.) Agree to leave this email thread intact, including subject line, and that our email will serve as our agreement. Due to the number of events we support, we do not sign MoUs or contracts for hackathons.
// Please note, if you accept this sponsorship it will be contingent upon the availability of a Wolfram language expert. Once you confirm that you'd like to commit to our sponsorship, I will look for someone to attend your event and will let you know within ten days.
// Please discuss this proposal with your organizing team and let me know whether you accept or decline this offer within five business days.

const Perks = async ({
  user,
  app,
}: {
  user: User;
  app: Tables<"applications">;
}) => {
  // fetch users table from supabase
  const supabase = createClient();

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(350);
    if (error) console.log("error", error);
    console.log("data", data);
    return data;
  };

  const users = await fetchUsers();
  console.log("users", users);
  if (!users) {
    return <div>loading...</div>;
  }
  // current users email should be included in the list of users[]
  const isInFirst350 = users.find((u) => u.email === user.email);

  const perks = [
    {
      company: "XYZ Domains",
      link: "https://xyz.com/",
      logo: "/images/sponsors/xyz.svg",
      description: `Free domain name for first 350 **(${isInFirst350 ? "YOU ARE ELIGIBLE!" : "you are not eligible"})**. The value of this domain is **$10.00 per user.**`,
      showLink: isInFirst350 ? true : false,
    },
    {
      company: "Wolfram",
      logo: "/images/sponsors/wolfram-sm.png",
      description:
        "Free access to Wolfram|One for all participants for six months. Wolfram|One includes both Desktop and Cloud access, full access to the Wolfram Language and Knowledgebase, FreeCDF Deployment, 5000 Wolfram|Alpha API calls, 5000 Cloud Credits, 2 installations per user and 2 GB of Cloud Storage. The value of this access is **$830.00 per user.**",
      bg: true,
      link: "https://company.wolfram.com/press-center/wolfram-corporate/",
      showLink: true,
    },
  ];

  // 5 second timer
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (app && app.complete) {
    return (
      <section className="w-full py-5 px-5 sm:px-10 fc gap-5 items-start justify-between rounded-2xl border border-neutral-300/30 bg-neutral-900 mt-5">
        <h3 className="text-3xl font-bold">Perks</h3>
        <div className="fc gap-4">
          {perks.map((perk) => (
            <div className="flex items-start gap-5 w-full" key={perk.company}>
              {perk.bg ? (
                <div className="bg-white p-2 rounded-md">
                  <Image
                    src={perk.logo}
                    alt={perk.company}
                    className="w-24"
                    width={200}
                    height={200}
                  />
                </div>
              ) : (
                <Image
                  src={perk.logo}
                  alt={perk.company}
                  className="w-24"
                  width={200}
                  height={200}
                />
              )}
              <div className="fc items-start justify-start gap-2 w-full">
                <h3 className="text-lg font-bold">{perk.company}</h3>
                <ReactMarkdown>{perk.description}</ReactMarkdown>
                {perk.showLink && (
                  <Link href={perk.link}>
                    <Button color="primary">
                      Claim <IoChevronForward className="ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  } else {
    return (
      <section className="w-full py-5 px-5 sm:px-10 fc gap-5 items-start justify-between rounded-2xl border border-neutral-300/30 bg-neutral-900 mt-5">
        <h3 className="text-3xl font-bold">Perks</h3>
        <p className="">Please complete your application to view the perks.</p>
      </section>
    );
  }
};

export default Perks;
