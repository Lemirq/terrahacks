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
}

const Approved: React.FC<Readonly<ApprovedProps>> = ({ name, email }) => (
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
            Congratulations, {name}! 🎉
          </Heading>
          <div className="text-lg text-neutral-200">
            <Text className="text-lg">
              You have been accepted to participate in Hack49, our virtual
              global hackathon. Your application stood out among many, and we
              are excited to see what innovative solutions you will bring to the
              table.
            </Text>
            <Text className="text-lg">
              Event Details:
              <ul className="list-disc">
                <li>
                  Date: <b>October 19, 2024 - October 21, 2024</b>
                </li>
                <li>Platform: Devpost</li>
              </ul>
            </Text>
            <Text className="text-lg">
              Important steps to get started:
              <ol>
                <li>Join our Discord/Slack Channel: [Link to the channel]</li>
                <li>Read the Participant Guide: [Link to the guide]</li>
                <li>
                  Prepare for the Event: Familiarize yourself with the schedule
                  and the resources provided.
                </li>
              </ol>
            </Text>
            <Text className="text-lg">
              Start brainstorming ideas and assembling your team if you haven't
              already. This is a fantastic opportunity to collaborate with peers
              from around the world and create something impactful.
            </Text>
            <Text className="text-lg">
              For any questions or further information, reach out to us at [Your
              Contact Information].
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
} as ApprovedProps;

export default Approved;
