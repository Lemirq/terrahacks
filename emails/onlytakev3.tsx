import { Body, Container, Head, Html, Preview, Tailwind, Heading, Text, Hr, Link, Img } from '@react-email/components';
import * as React from 'react';
import tailwindConfig from './tailwind.config';
import Footer from './Footer';

const OnlyTake: React.FC = () => (
	<Html>
		<Tailwind config={tailwindConfig}>
			<Head />
			<Preview>Last chance to apply for Hack49!</Preview>
			<Body className="bg-neutral-950 mx-auto font-sans">
				<Container className="m-auto p-5 pb-24 text-white">
					<Heading className="text-3xl font-bold mb-5">Final Days to Apply!</Heading>
					<div className="text-lg text-neutral-200">
						<Text className="text-lg">Hi,</Text>
						<Text className="text-lg">
							We're in the final days before Hack49 2024! If you haven't completed your application yet, time is running out.
							Applications will be <b>closed on October 18 at 11:59PM (EDT)</b>. It only takes <b>30 seconds</b> to apply, and you can
							do it <Link href="https://hack49.com/apply">here</Link>.
						</Text>
						<Text className="text-lg">
							Anyone who doesn't complete their application will not be able to participate, so don't miss out!
						</Text>
						<Text className="text-lg">Looking forward to seeing you at Hack49!</Text>
					</div>
					<Footer />
				</Container>
			</Body>
		</Tailwind>
	</Html>
);

export default OnlyTake;
