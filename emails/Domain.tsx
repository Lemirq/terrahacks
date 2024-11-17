import { Body, Container, Head, Html, Preview, Tailwind, Heading, Text, Hr, Link, Img } from '@react-email/components';
import * as React from 'react';
import tailwindConfig from './tailwind.config';
import Footer from './Footer';
import { Button } from '@nextui-org/react';

const Domain: React.FC = () => (
	<Html>
		<Tailwind config={tailwindConfig}>
			<Head />
			<Preview>YOUR FREE DOMAIN HAS ARRIVED!!</Preview>
			<Body className="bg-neutral-950 mx-auto font-sans">
				<Container className="m-auto p-5 pb-24 text-white">
					<Img src={'https://i.imgur.com/1DMgfHd.png'} alt="image" className="m-auto rounded-3xl w-full mt-10" />
					<Heading className="text-3xl font-bold mb-5">Your free XYZ domain is here!</Heading>
					<div className="text-lg text-neutral-200">
						<Text className="text-lg">Dear Hacker,</Text>
						<Text className="text-lg">
							Congratulations on being one of the first 350 applicants to register for Hack49! We are excited to have you join our
							global hackathon community.
						</Text>
						<Text className="text-lg">
							As part of your registration, we're pleased to offer you a <b>1-year free .XYZ domain</b>. This domain is a great way to
							showcase your projects and ideas to the world. To help you get started, we've attached a pamphlet with detailed
							information and instructions on how to claim and set up your domain.
						</Text>

						<Container className="my-8">
							<Link
								href="https://drive.google.com/file/d/1IJaoJuSXOME8ULeF7xEZPKdWeAPqczCt/view?usp=drive_link"
								className="text-black underline w-full px-4 py-3 rounded-md text-center bg-white"
							>
								Claim your domain
							</Link>
						</Container>
						<Text className="text-lg">If you have any questions or need assistance, feel free to reach out.</Text>
						<Text className="text-lg">Once again, we were amazed to see everyone's projects during Hack49!</Text>
						{/* <Button href="" className="mt-5">
							Claim your domain
						</Button> */}
					</div>
					<Footer />
				</Container>
			</Body>
		</Tailwind>
	</Html>
);

export default Domain;
