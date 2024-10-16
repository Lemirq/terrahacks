import { Body, Container, Head, Html, Preview, Tailwind, Heading, Text, Hr, Link, Img } from '@react-email/components';
import * as React from 'react';
import tailwindConfig from './tailwind.config';
import Footer from './Footer';

const OnlyTake: React.FC = () => (
	<Html>
		<Tailwind config={tailwindConfig}>
			<Head />
			<Preview>Applications close on October 10th—don't miss out!</Preview>
			<Body className="bg-neutral-950 mx-auto font-sans">
				<Container className="m-auto p-5 pb-24 text-white">
					<Img src={'https://i.postimg.cc/vBYfYpws/closing.png'} alt="image" className="m-auto rounded-3xl w-full mt-10" />
					<Heading className="text-3xl font-bold mb-5">Applications are closing soon...</Heading>
					<div className="text-lg text-neutral-200">
						<Text className="text-lg">Hi,</Text>
						<Text className="text-lg">
							We hope you're doing well! This is a reminder that applications for Hack49 will <b>CLOSE on October 10, 2024</b>. Make
							sure to apply before the deadline to secure your spot. Applications now take only <b>30 seconds to complete</b>, and you
							can apply <Link href="https://hack49.com/apply">here</Link>.
						</Text>
						<Text className="text-lg">
							We're offering some incredible prizes, including <b>Elegoo Mars 5 3D Printer, Elegoo Saturn 4 3D Printer</b>,
							<b>cloud compute credits</b>, potential access to <b>OpenAI credits</b>, and <b>cash prizes</b>!
						</Text>
						<Text className="text-lg">Plus, don't forget our neurotech category, where you can win exclusive BCI HARDWARE!</Text>
						<Text className="text-lg">
							To stay connected and get quick updates, join our <Link href="https://discord.gg/cgBYcqnvVy">Hack49 Discord server</Link>
							—a global community of young developers. You'll get faster responses from our team, ask questions, and get insights into
							the hackathon.
						</Text>

						<Text className="text-lg">
							<b>Apply soon—October 10 is just around the corner!</b> We can't wait to see you there!
						</Text>
					</div>
					<Footer />
				</Container>
			</Body>
		</Tailwind>
	</Html>
);

export default OnlyTake;
