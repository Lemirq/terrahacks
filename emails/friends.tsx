import { Body, Container, Head, Html, Preview, Tailwind, Heading, Text, Hr, Link } from '@react-email/components';
import * as React from 'react';
import tailwindConfig from './tailwind.config';
import Footer from './Footer';

const OnlyTake: React.FC = () => (
	<Html>
		<Tailwind config={tailwindConfig}>
			<Head />
			<Preview>Invite Friends to Hack49 with the new Friend Pass!</Preview>
			<Body className="bg-neutral-950 mx-auto font-sans">
				<Container className="m-auto p-5 pb-24 text-white">
					<Heading className="text-3xl font-bold mb-5">Exciting News: Friend Pass System!</Heading>
					<div className="text-lg text-neutral-200">
						<Text className="text-lg">Hey Hackers!</Text>
						<Text className="text-lg">
							We’re excited to introduce a new Friend Pass system at Hack49! This is your chance to invite teammates who may have been
							rejected or forgotten to apply for our hackathon. Here’s how it works:
						</Text>
						<ul className="list-disc">
							<li className="text-lg">
								Invite Up to 2 Friends: Each invite will grant your friend instant acceptance into Hack49. Plus, for every person you
								invite, you’ll earn an additional raffle ticket to win FREE Hack49 merchandise shipped right to your door!
							</li>
							<li className="text-lg">
								Account Creation Required: Your invited friends must create a Hack49 account on our website before they can accept
								their Friend Pass.
							</li>
						</ul>
						<Text className="text-lg">You can check out your dashboard now and use the provided link to invite your friends!</Text>
						<Text className="text-lg">
							Thank you for being part of Hack49. We can’t wait to see the amazing teams you bring together!
						</Text>
					</div>
					<Footer />
				</Container>
			</Body>
		</Tailwind>
	</Html>
);

export default OnlyTake;
