import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  render,
  Tailwind,
  Text,
} from "@react-email/components";
import tailwindConfig from "./tailwind.config";

interface WaitlistEmailProps {
  name: string;
  email: string;
}

export const WaitlistEmail: React.FC<Readonly<WaitlistEmailProps>> = ({
  name,
  email,
}) => (
  <Html>
    <Tailwind config={tailwindConfig}>
      <Head></Head>

      <Preview>
        Thank you for joining our waitlist and for your patience
      </Preview>
      <Body className="bg-neutral-950 mx-auto font-sans">
        <Container className="m-auto p-5 py-12 text-white">
          <Heading className="text-3xl font-bold mb-5">
            The wait is over!
          </Heading>
          <Container>
            <Text className="text-xl font-bold">Hi {name.split(" ")[0]},</Text>
            <Text className="text-lg text-neutral-200">
              We’re thrilled to let you know that applications for Hack49 are
              officially live! 🌟
            </Text>
            <Text className="text-lg text-neutral-200">
              As someone who’s shown interest in Hack49, you’re among the first
              to get the chance to apply and secure your spot. This is your
              opportunity to join a global community of innovators, creators,
              and problem-solvers.
            </Text>
            <Text className="text-lg text-neutral-200 font-bold">
              What to Expect at Hack49:
            </Text>
            <ul className="list-disc flex flex-col gap-2 justify-start">
              <li className="text-lg text-neutral-200">
                🚀 A weekend of hacking, learning, and networking with
                like-minded individuals
              </li>
              <li className="text-lg text-neutral-200">
                🎉 Workshops, mentorship, and resources to help you bring your
                ideas to life
              </li>
              <li className="text-lg text-neutral-200">
                🏆 Prizes, swag, and opportunities to showcase your work
              </li>
              <li className="text-lg text-neutral-200">
                🌍 The chance to connect with students from around the world
              </li>
              <li className="text-lg text-neutral-200">
                🔥 A platform to build your skills, grow your network, and make
                an impact
              </li>
            </ul>
            <Text className="text-lg text-neutral-200">
              Don’t miss out on this chance to be part of something
              extraordinary. Apply now and take the first step towards
              showcasing your skills on an international stage!
            </Text>
            <Link
              href="https://hack49.com/signup"
              className="text-lg bg-blue-500 px-4 py-2 rounded-md mt-5 text-white"
            >
              Apply Now!
            </Link>
            <Text className="text-lg text-neutral-200 mt-10">
              We can’t wait to see what you create at Hack49! 🚀
            </Text>
            <Hr className="border border-solid border-neutral-600 my-[26px] mx-0 w-full" />
            <Text className="text-neutral-300/70 text-[12px] leading-[24px]">
              This email was sent to{" "}
              <span className="text-white underline">{email}</span> because you
              applied to participate in Hack49. If you believe this was a
              mistake, please contact us at{" "}
              <Link
                className="text-white underline"
                href="mailto:team@hack49.com"
              >
                team@hack49.com
              </Link>
              .
            </Text>
          </Container>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

WaitlistEmail.PreviewProps = {
  name: "John Doe",
  email: "sharmavihaan190@gmail.com",
} as WaitlistEmailProps;

console.log(render(<WaitlistEmail {...WaitlistEmail.PreviewProps} />));
export default WaitlistEmail;
