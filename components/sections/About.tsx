'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Video from '../Video';
const About = () => {
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const listItem = {
		hidden: { opacity: 0 },
		show: { opacity: 1 },
	};

	return (
		<section id="about" className="w-full relative">
			{/* <div className="absolute w-full h-full">
				<Image
					src="/images/decoration.png"
					alt="Sphere"
					width={500}
					height={500}
					style={{
						transform: 'translate(80%, -50%)',
						width: '50rem',
					}}
				/>
			</div> */}
			<motion.div
				variants={container}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
				className="max-w-7xl fc gap-10 w-full mx-auto z-10 px-5 sm:px-10 my-24 relative"
			>
				<motion.h3
					variants={listItem}
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-4xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium"
				>
					About Us
				</motion.h3>
				<p className="text-lg text-neutral-300">Play the video below to learn more about Hack49 and what we have to offer.</p>
				<iframe
					className="max-w-6xl w-full aspect-video rounded-2xl"
					src="https://www.youtube.com/embed/bFUflO_1Tuw"
					title=""
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
				></iframe>
				{/* <Video /> */}
				{/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
					<motion.div variants={listItem} className="fc gap-3 w-full">
						<h4 className="text-2xl font-semibold text-white">Overview</h4>
						<p className="text-lg text-gray-400 sm:text-center sm:min-w-[300px] text-left">
							Hack49 is a global hackathon designed to bring together creative minds, coders, and tech enthusiasts from around the
							world. Our event focuses on collaboration, innovation, and the development of cutting-edge technology projects.
							Participants will engage in various challenges and work together to create solutions that address real-world problems.
						</p>
					</motion.div>
					<motion.div variants={listItem} className="fc gap-3 w-full">
						<h4 className="text-2xl font-semibold text-white">Our Mission</h4>
						<p className="text-lg text-gray-400 sm:text-center sm:min-w-[300px] text-left">
							The mission of Hack49 is to foster a community of innovation and creativity. We aim to provide a platform for individuals
							to showcase their skills, learn from each other, and push the boundaries of technology. Our core objectives include
							promoting technological advancement, encouraging collaboration, and empowering participants to turn their ideas into
							reality.
						</p>
					</motion.div>
					<motion.div variants={listItem} className="fc gap-3 w-full">
						<h4 className="text-2xl font-semibold text-white">Benefits</h4>
						<p className="text-lg text-gray-400 text-left">
							Participants in Hack49 will gain numerous benefits, including:
						</p>
						<ul className="text-lg text-gray-400 text-left items-start gap-3 fc">
							<li>
								<b>Skill Development: </b>Enhance your technical skills and learn new technologies.
							</li>
							<li>
								<b>Networking: </b>Connect with like-minded individuals, industry experts, and potential mentors.
							</li>
							<li>
								<b>Experience: </b>Gain hands-on experience by working on real-world projects and challenges.
							</li>
							<li>
								<b>Recognition: </b>Showcase your talents and get recognized for your innovative solutions.
							</li>
							<li>
								<b>Growth: </b>Personal and professional growth through collaboration and competition.
							</li>
						</ul>
					</motion.div>
					<motion.div variants={listItem}>
						<Image src="/images/collaboration.jpg" alt="Collaboration" width={500} height={500} className="rounded-3xl w-full" />
					</motion.div>
				</div> */}
			</motion.div>
		</section>
	);
};

export default About;
