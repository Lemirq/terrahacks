import { Link, Text, Hr, Img } from '@react-email/components';
const Footer = ({ email }: { email?: string }) => {
	return (
		<>
			<Text className="font-bold text-lg">Best regards,</Text>
			<Text className="font-bold text-lg">Hack49 Team</Text>
			<ul className="flex gap-2 nav-links pl-0 list-none text-white text-sm">
				<li>
					<Link className="text-white" href="https://www.instagram.com/hack49__/" target="_blank" rel="noopener noreferrer">
						Instagram
					</Link>
				</li>
				<li>
					<Link className="text-white" href="https://x.com/hack49_" target="_blank" rel="noopener noreferrer">
						Twitter
					</Link>
				</li>
				<li>
					<Link className="text-white" href="https://www.linkedin.com/company/hack49-global/" target="_blank" rel="noopener noreferrer">
						LinkedIn
					</Link>
				</li>
				{/* <li>
							<a href="https://www.tiktok.com/@hacks_49" target="_blank" rel="noopener noreferrer">
								<FaTiktok />
							</a>
						</li> */}
				<li>
					<Link
						className="text-white"
						href="https://www.youtube.com/channel/UCHT4o_3qcYAMNw1Sgdq7FMQ"
						target="_blank"
						rel="noopener noreferrer"
					>
						Youtube
					</Link>
				</li>
			</ul>
			<Hr className="border border-solid border-neutral-600 my-[26px] mx-0 w-full" />
			<Link className="text-white" href="https://hack49.com" target="_blank" rel="noopener noreferrer">
				<Img src="https://hack49.com/images/logo-horizontal-big.png" alt="Logo" className="w-full max-w-4xl" />
			</Link>
			<Text className="text-neutral-300/70 text-[12px] leading-[24px]">
				This email was sent to {email || 'you'} because you applied to participate in Hack49. If you believe this was a mistake, please
				contact us at{' '}
				<Link className="text-white underline" href="mailto:team@hack49.com">
					team@hack49.com
				</Link>
				.
			</Text>
		</>
	);
};

export default Footer;
