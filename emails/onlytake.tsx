import { Body, Container, Head, Html, Preview, Tailwind, Heading, Text, Hr, Link, Img } from '@react-email/components';
import * as React from 'react';
import tailwindConfig from './tailwind.config';
import Footer from './Footer';

const OnlyTake: React.FC = () => (
	<Html>
		<Tailwind config={tailwindConfig}>
			<Head />
			<Preview>Applications only take 30 seconds!!</Preview>
			<Body className="bg-neutral-950 mx-auto font-sans">
				<Container className="m-auto p-5 pb-24 text-white">
					<Img src={'https://hack49.com/images/emails/30secs.png'} alt="image" className="m-auto rounded-3xl w-full mt-10" />
					<Heading className="text-3xl font-bold mb-5">It's easier than ever...</Heading>
					<div className="text-lg text-neutral-200">
						<Text className="text-lg">Hi,</Text>
						<Text className="text-lg">
							We hope you're doing well! We wanted to remind you to complete your application for Hack49. Applications now take only{' '}
							<b>30 seconds to complete</b>, and you can apply <Link href="https://hack49.com/apply">here</Link>.
						</Text>
						<Text className="text-lg">
							Complete your Hack49 application to get a <b>FREE DOMAIN</b>! <i>Limited domains available.</i>
						</Text>
						<Text className="text-lg">
							Besides our various other prizes like <b>3D printers, domains, cloud compute</b>, and potentially even access to{' '}
							<b>OpenAI credits</b>, we also have a ton of <b>cash prizes</b>!
						</Text>
						<Text className="text-lg">
							There are 3 tracks, and the top 3 teams in each track can win <b>$100, $50, and $25</b>. The overall top 3 teams will get
							an additional <b>$150, $100, or $50</b> added to their prize.
						</Text>
						<Text className="text-lg">And of course, we have the usual special award categories and more!</Text>
						<Text className="text-lg">
							To stay connected, join our <Link href="https://discord.gg/cgBYcqnvVy">Hack49 Discord server</Link>
							—a global community of young developers. There, you can ask questions, receive announcements, and gain insights into
							Hack49. Plus, you’ll get quicker responses from our team.
						</Text>

						<Text className="text-lg">Looking forward to seeing you complete your application!</Text>
					</div>
					<Footer />
				</Container>
			</Body>
		</Tailwind>
	</Html>
);

export default OnlyTake;
