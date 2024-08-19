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

const Signup: React.FC = () => (
  <Html>
    <Tailwind config={tailwindConfig}>
      <Head />
      <Preview>We've received your application</Preview>
      <Body className="bg-neutral-950 mx-auto font-sans">
        <Container className="m-auto p-5 py-24 text-white">
          {/* <Img src="https://hack49.com/images/og-image.png" alt="image" className="m-auto rounded-3xl w-full" /> */}
          <Heading className="text-3xl font-bold mb-5">
            Signup Confirmation
          </Heading>
          <div className="text-lg text-neutral-200">
            <Text className="text-lg">
              Confirm your email address 👉 <Link href="">Here</Link> 👈
            </Text>
            <Text>If you didn't request this, please ignore this email.</Text>
            <Text className="font-bold text-lg mt-4">Best regards,</Text>
            <Text className="font-bold text-lg">Hack49 Team</Text>
          </div>
          <Hr className="border border-solid border-neutral-600 my-[26px] mx-0 w-full" />
          <Text className="text-neutral-300/70 text-[12px] leading-[24px]">
            This email was sent to you because you applied to participate in
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

export default Signup;
