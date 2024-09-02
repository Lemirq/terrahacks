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
import { FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import Footer from "./Footer";

interface AppReceivedProps {
  email: string;
  code: string;
}

const AppReceived: React.FC<Readonly<AppReceivedProps>> = ({ email, code }) => (
  <Html>
    <Tailwind config={tailwindConfig}>
      <Head />
      <Preview>We've received your application!</Preview>
      <Body className="bg-neutral-950 mx-auto font-sans">
        <Container className="m-auto p-5 pb-24 text-white">
          <Img
            src={"https://hack49.com/images/emails/app_received.png"}
            alt="image"
            className="m-auto rounded-3xl w-full mt-10"
          />
          <Heading className="text-3xl font-bold mb-5">
            Thanks for Applying!
          </Heading>
          <div className="text-lg text-neutral-200">
            <Text className="text-lg">
              Thank you for applying to participate in Hack49! We are excited to
              have you on board and can't wait to see what you create.
            </Text>
            <Text className="text-lg">
              We will review your application and get back to you as soon as
              possible.
            </Text>
            <Text className="text-lg">
              Additionally, join the{" "}
              <Link href="https://discord.gg/cgBYcqnvVy">
                Hack49 Discord server
              </Link>
              , a global community of young developers where you can ask
              questions, receive announcements, and gain further insights into
              Hack49.
            </Text>
            <Text className="text-lg">
              In the meantime, if you're interested in winning a{" "}
              <span className="font-bold">FREE HACK49 T-SHIRT</span>, be sure to
              check out the referral raffle program on the{" "}
              <Link href="https://hack49.com/dashboard">dashboard</Link>. Invite
              your friends to boost your chances of winning a t-shirt—every
              invite earns you an extra ticket!
            </Text>
            <Text className="text-lg">
              You can post on social media to boost your chances of winning. The
              following image can accompany your post:
            </Text>
            <Img
              src={
                code
                  ? `https://hack49.com/api/generate_img?mode=applied&code=${code}`
                  : `https://hack49.com/api/generate_img?mode=applied`
              }
              alt="image"
              className="m-auto rounded-md w-full"
            />
          </div>
          <Footer email={email} />
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
AppReceived.PreviewProps = {
  code: "Vihaan",
  email: "sharmavihaan190@gmail.com",
} as AppReceivedProps;

export default AppReceived;
