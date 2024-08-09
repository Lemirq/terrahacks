import { Body, Button, Img, Container, Head, Html, Preview, Tailwind, Heading, Markdown, Text, Hr, Link } from '@react-email/components';
import * as React from 'react';
import tailwindConfig from './tailwind.config';

interface RejectedProps {
	name: string;
	email: string;
}

const Rejected: React.FC<Readonly<RejectedProps>> = ({ name, email }) => (
	<Html>
		<Tailwind config={tailwindConfig}>
			<Head />
			<Preview>
				Thank you for applying to Hack49. Unfortunately, we are unable to offer you a spot this year. We appreciate your interest and
				encourage you to apply again in the future.
			</Preview>
			<Body className="bg-neutral-950 mx-auto font-sans">
				<Container className="m-auto p-5 py-24 text-white">
					{/* <Img src="https://hack49.com/images/og-image.png" alt="image" className="m-auto rounded-3xl w-full" /> */}
					<Heading className="text-3xl font-bold mb-5">Dear {name},</Heading>
					{/* <Button
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
						href="https://example.com"
					>
						Big black balls
					</Button> */}
					<div className="text-lg text-neutral-200">
						<Text className="text-lg">Thank you for applying to Hack49, our virtual global hackathon.</Text>

						<Text className="text-lg">
							After careful consideration, we regret to inform you that we are unable to offer you a spot in this year's event. The
							selection process was incredibly competitive, and we had many outstanding applications.
						</Text>
						<Text className="text-lg">
							Please do not be discouraged. Hackathons are about learning, growing, and continuing to innovate. We hope you will apply
							again in the future and continue to pursue your passion for creating impactful solutions.
						</Text>
						<Text className="text-lg">
							Thank you again for your interest in Hack49. We wish you the best in all your future endeavors.
						</Text>
						<Text className="font-bold text-lg">Best regards,</Text>
						<Text className="font-bold text-lg">Hack49 Team</Text>
					</div>
					<Hr className="border border-solid border-neutral-600 my-[26px] mx-0 w-full" />
					<Text className="text-neutral-300/70 text-[12px] leading-[24px]">
						This email was sent to {email} because you applied to participate in Hack49. If you believe this was a mistake, please contact
						us at{' '}
						<Link className="text-white underline" href="mailto:team@hack49.com">
							team@hack49.com
						</Link>
						.
					</Text>
				</Container>
			</Body>
		</Tailwind>
	</Html>
);
Rejected.PreviewProps = {
	name: 'John Doe',
	email: 'sharmavihaan190@gmail.com',
} as RejectedProps;

export default Rejected;
