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
} from "@react-email/components";
import * as React from "react";
import tailwindConfig from "./tailwind.config";

interface AppReceivedProps {
  name: string;
  email: string;
}

const AppReceived: React.FC<Readonly<AppReceivedProps>> = ({ name, email }) => (
  <Html>
    <Tailwind config={tailwindConfig}>
      <Head />
      <Preview>We've received your application</Preview>
      <Body className="bg-neutral-950 mx-auto font-sans">
        <Container className="m-auto p-5 py-24 text-white">
          {/* <Img src="https://hack49.com/images/og-image.png" alt="image" className="m-auto rounded-3xl w-full" /> */}
          <Heading className="text-3xl font-bold mb-5">
            Application Received
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
              In the meantime, feel free to explore the referral raffle on the{" "}
              <Link href="https://hack49.com/dashboard">Dashboard</Link> and
              invite your friends to increase your chances of winning a free
              t-shirt!
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
AppReceived.PreviewProps = {
  name: "Vihaan Sharma",
  email: "sharmavihaan190@gmail.com",
} as AppReceivedProps;

export default AppReceived;
