import {
  Body,
  Button,
  Img,
  Container,
  Head,
  Html,
  Preview,
  Tailwind,
  Heading,
  Markdown,
  Text,
  Hr,
  Link,
} from "@react-email/components";
import * as React from "react";
import tailwindConfig from "./tailwind.config";

interface ApprovedProps {
  name: string;
  email: string;
  code?: string;
}

const Approved: React.FC<Readonly<ApprovedProps>> = ({ name, email, code }) => (
  <Html>
    <Tailwind config={tailwindConfig}>
      <Head />
      <Preview>Congratulations! Your application has been approved.</Preview>
      <Body className="bg-neutral-950 mx-auto font-sans">
        <Container className="m-auto p-5 py-24 text-white">
          <Img
            src="https://hack49.com/images/emails/accepted_email.png"
            alt="image"
            className="m-auto rounded-3xl w-full"
          />
          <Heading className="text-3xl font-bold mb-5">
            Congratulations, {name.split(" ")[0]}! 🎉
          </Heading>
          <div className="text-lg text-neutral-200">
            <Text className="text-lg">
              You have been accepted to participate in Hack49! Your application
              stood out among many, and we are excited to see what innovative
              solutions you will bring to the table.
            </Text>
            <Text className="text-lg">
              Date: <b>October 19, 2024 - October 21, 2024</b>
            </Text>
            <Text className="text-lg">
              Important steps to get started:
              <ol>
                <li>
                  Join our{" "}
                  <Link href="https://discord.gg/cgBYcqnvVy">Discord</Link>
                </li>
                <li>
                  Join our{" "}
                  <Link href="https://hack49-2024.devpost.com">Devpost</Link>
                </li>

                {/*<li>Read the Participant Guide: [Link to the guide]</li>*/}
                <li>
                  Prepare for the Event: Familiarize yourself with the
                  dashboard, as all the event information will be available
                  there (schedule, prizing, etc.).
                </li>
              </ol>
            </Text>
            <Text className="text-lg">One more thing...</Text>
            <Container>
              If you want to increase your chances of winning a FREE t-shirt,
              post on social media!{" "}
              <p className="mt-4">Here's a sample post:</p>
              <Container className="text-lg bg-neutral-800 p-4 rounded-lg">
                <p>
                  Excited to be accepted to participate in Hack49! 🚀 Can't wait
                  to collaborate with other innovators and create something
                  amazing. 🌟
                </p>
                <p>
                  Hack49 is a 3-day virtual global hackathon where you can
                  showcase your skills and win amazing prizes!
                </p>
                {code && (
                  <>
                    <p>
                      You can use my referral code when you apply to help me win
                      a free Hack49 t-shirt! 🎁 My referral code: {code}
                    </p>
                  </>
                )}
                <p>#Hack49 #Hackathon #Tech #Innovation</p>
              </Container>
              <Text className="text-lg">
                You can post on social media to boost your chances of winning.
                The following image can accompany your post:
              </Text>
              <Img
                src={
                  code
                    ? `https://hack49.com/api/generate_img?mode=accepted&code=${code}`
                    : `https://hack49.com/api/generate_img?mode=accepted`
                }
                alt="image"
                className="m-auto rounded-md w-full"
              />
            </Container>
            <Text className="text-lg">
              Start brainstorming ideas and assembling your team if you haven't
              already. This is a fantastic opportunity to collaborate with peers
              from around the world and create something impactful.
            </Text>
            <Text className="text-lg">
              If you have any questions, feel free to ask in the Discord server
              or at <Link href="mailto:team@hack49.com">team@hack49.com</Link>.
            </Text>
            <Text className="text-lg">
              Looking forward to seeing you at Hack49!
            </Text>

            <Text className="font-bold text-lg">Best regards,</Text>
            <Text className="font-bold text-lg">Hack49 Team</Text>
          </div>
          <Hr className="border border-solid border-neutral-600 my-[26px] mx-0 w-full" />
          <Text className="text-neutral-300/70 text-[12px] leading-[24px]">
            This email was sent to {email} because you applied to participate in
            Hack49. If you believe this was a mistake, please contact us at{" "}
            <Link
              className="text-white underline"
              href="mailto:team@hack49.com"
            >
              team@hack49.com
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
Approved.PreviewProps = {
  name: "John Doe",
  email: "sharmavihaan190@gmail.com",
  code: "ABC123",
} as ApprovedProps;

export default Approved;
