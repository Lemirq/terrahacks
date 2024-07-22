'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
const About = () => {
	return (
		<section id="about" className="w-full px-5 sm:px-10 fc gap-10 max-w-7xl mx-auto my-24">
			<motion.h3
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-4xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium"
			>
				About Us
			</motion.h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
				<div className="fc gap-3 w-full">
					<h4 className="text-2xl font-semibold text-black dark:text-white">Overview</h4>
					<p className="text-lg text-gray-600 dark:text-gray-400 sm:text-center sm:min-w-[300px] text-left">
						Hack49 is a global hackathon designed to bring together creative minds, coders, and tech enthusiasts from around the world.
						Our event focuses on collaboration, innovation, and the development of cutting-edge technology projects. Participants will
						engage in various challenges and work together to create solutions that address real-world problems.
					</p>
				</div>
				<div className="fc gap-3 w-full">
					<h4 className="text-2xl font-semibold text-black dark:text-white">Our Mission</h4>
					<p className="text-lg text-gray-600 dark:text-gray-400 sm:text-center sm:min-w-[300px] text-left">
						The mission of Hack49 is to foster a community of innovation and creativity. We aim to provide a platform for individuals to
						showcase their skills, learn from each other, and push the boundaries of technology. Our core objectives include promoting
						technological advancement, encouraging collaboration, and empowering participants to turn their ideas into reality.
					</p>
				</div>
				<div className="fc gap-3 w-full">
					<h4 className="text-2xl font-semibold text-black dark:text-white">Benefits</h4>
					<p className="text-lg text-gray-600 dark:text-gray-400 text-left">
						Participants in Hack49 will gain numerous benefits, including:
					</p>
					<ul className="text-lg text-gray-600 dark:text-gray-400 text-left gap-3 fc">
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
				</div>
				<Image src="/images/collaboration.jpg" alt="Collaboration" width={500} height={500} className="rounded-3xl w-full" />
			</div>
		</section>
	);
};

export default About;
