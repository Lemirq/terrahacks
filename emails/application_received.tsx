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

interface AppReceivedProps {
  origin: string;
  email: string;
  code: string;
}

const AppReceived: React.FC<Readonly<AppReceivedProps>> = ({
  origin,
  email,
  code,
}) => (
  <Html>
    <Tailwind config={tailwindConfig}>
      <Head />
      <Preview>We've received your application!</Preview>
      <Body className="bg-neutral-950 mx-auto font-sans">
        <Container className="m-auto p-5 py-24 text-white">
          <Img
            src={"http://" + origin + "/images/app received.png"}
            alt="image"
            className="m-auto rounded-3xl w-full"
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
              <Link href="https://hack49.com/dashboard">
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
              You can also create your own referral code to generate a custom
              version of the image below with your code, and share it on social
              media! The image below may or may not contain your code, if it
              doesn't, you can generate a new one on the dashboard.
            </Text>
            <Img
              src={
                code
                  ? `http://${origin}/api/generate_img?mode=applied&code=${code}`
                  : `http://${origin}/api/generate_img?mode=applied`
              }
              alt="image"
              className="m-auto rounded-3xl w-full"
            />
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
AppReceived.PreviewProps = {
  code: "Vihaan",
  origin: "dedd-70-50-92-209.ngrok-free.app",
  email: "sharmavihaan190@gmail.com",
} as AppReceivedProps;

export default AppReceived;
