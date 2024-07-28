'use client';
import React from 'react';
import { people } from '@/data/people';
import { motion } from 'framer-motion';
import { Button } from '@nextui-org/react';
import { IoLogoLinkedin } from 'react-icons/io5';

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
const MeetTheTeam = () => {
	return (
		<section id="founders" className="w-full px-5 sm:px-10 fc gap-10 max-w-6xl mx-auto my-24">
			<motion.h3
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium"
			>
				Meet The Founders
			</motion.h3>
			<motion.div
				variants={container}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
			>
				{people.map((person, index) => (
					<Founder key={index} {...person} />
				))}
			</motion.div>
		</section>
	);
};

interface FounderProps {
	name: string;
	title: string;
	description: string;
	image: string;
	lk: string;
}

const Founder = ({ name, title, description, image, lk }: FounderProps) => {
	return (
		<motion.div variants={listItem} className="fc gap-2 h-full w-full justify-start">
			<div className="w-40 h-40 rounded-full overflow-hidden">
				<img src={image} alt={name} className="w-full h-full object-cover" />
			</div>
			<h4 className="text-2xl font-semibold text-black dark:text-white inline-flex justify-center items-center gap-2">
				{/* dont wrap text */}
				<span className="whitespace-nowrap">{name}</span>
			</h4>
			<div className="fr gap-3 mb-4">
				<div className="relative">
					<span className="relative z-10 inline-block rounded-full border border-zinc-700 bg-zinc-900/20 px-3 py-1.5 text-neutral-300 md:mb-0 text-lg font-bold">
						{title}
						<span className="absolute bottom-0 left-3 right-3 h-[1px] bg-gradient-to-r from-zinc-500/0 via-zinc-300 to-zinc-500/0"></span>
					</span>
				</div>
				<a href={lk} target="_blank" rel="noreferrer">
					<Button isIconOnly variant="bordered">
						<IoLogoLinkedin />
					</Button>
				</a>
			</div>

			{/* <p className="text-lg text-gray-600 dark:text-gray-400">{title}</p> */}
			<p className="text-lg sm:text-sm text-gray-200 text-center max-w-[30ch]">{description}</p>
		</motion.div>
	);
};

export default MeetTheTeam;
