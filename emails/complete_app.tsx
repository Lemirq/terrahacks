import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Tailwind,
  Heading,
  Text,
  Hr,
  Link,
  Img,
} from "@react-email/components";
import * as React from "react";
import tailwindConfig from "./tailwind.config";
import Footer from "./Footer";

// this email is going to be sent to people that have not completed their hack49 applications and started it a week ago

const CompleteApp: React.FC = () => (
  <Html>
    <Tailwind config={tailwindConfig}>
      <Head />
      <Preview>Want a free domain?</Preview>
      <Body className="bg-neutral-950 mx-auto font-sans">
        <Container className="m-auto p-5 pb-24 text-white">
          <Img
            src={"https://hack49.com/images/emails/domain.png"}
            alt="image"
            className="m-auto rounded-3xl w-full mt-10"
          />
          <Heading className="text-3xl font-bold mb-5">
            Complete Your Application
          </Heading>
          <div className="text-lg text-neutral-200">
            <Text className="text-lg">Hi,</Text>
            <Text className="text-lg">
              The free domains are running out!! 🚨
            </Text>
            <Text className="text-lg">
              Complete your Hack49 application to get a <b>FREE DOMAIN</b>!{" "}
              <i>Limited domains available.</i>
            </Text>
            <Text className="text-lg">
              We noticed that you started your application for Hack49 but
              haven’t completed it yet. If you have any questions or need
              assistance, don’t hesitate to reach out to us at{" "}
              <Link href="mailto:team@hack49.com">team@hack49.com</Link>. We're
              here to help!
            </Text>
            <Text className="text-lg">
              To stay connected, join our{" "}
              <Link href="https://discord.gg/cgBYcqnvVy">
                Hack49 Discord server
              </Link>
              —a global community of young developers. There, you can ask
              questions, receive announcements, and gain insights into Hack49.
              Plus, you’ll get quicker responses from our team.
            </Text>
            <Text className="text-lg">
              If you're interested in winning a{" "}
              <span className="font-bold">FREE HACK49 T-SHIRT</span>, be sure to
              check out the referral raffle program on the{" "}
              <Link href="https://hack49.com/dashboard">dashboard</Link>. Invite
              your friends to boost your chances of winning a t-shirt—every
              invite earns you an extra ticket!
            </Text>

            <Text className="text-lg">
              Looking forward to seeing you complete your application!
            </Text>
          </div>
          <Footer />
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default CompleteApp;
