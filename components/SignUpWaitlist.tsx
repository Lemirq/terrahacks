'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { IoArrowDownCircle, IoChevronDown, IoChevronForward } from 'react-icons/io5';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import Socials from '@/components/Socials';

const SignUpForm = () => {
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);

		// post request to /api/mailing with body formData
		const response = await fetch('/api/waitlist', {
			method: 'POST',
			body: JSON.stringify({
				name: formData.get('name'),
				email: formData.get('email'),
			}),
		});

		const data = await response.json();
		// console.log(data);

		if (data.status === 'success') {
			toast.success('Thanks for signing up!', {
				description: 'We will get back to you soon. \n email: ' + formData.get('email') + '\n name: ' + formData.get('name'),
			});
		} else {
			console.error(data.error);
			toast.error('Something went wrong!', {
				description: data.error,
			});
		}
	};
	return (
		<form className="fc gap-2 w-full items-start" onSubmit={handleSubmit}>
			<h3 className="text-neutral-400 text-center text-lg">Join the Hack49 waitlist!</h3>
			<div className="sm:fr fc gap-2 w-full">
				<div className="fc items-start w-full">
					<label htmlFor="name" className="text-neutral-400 text-sm">
						Name
					</label>
					<input
						name="name"
						id="name"
						required
						type="text"
						placeholder="John Doe"
						className="rounded-lg border border-neutral-800 px-5 py-3 w-full relative bg-neutral-950 placeholder:text-neutral-600 active:outline-none focus:outline-none text-white"
					/>
				</div>
				<div className="fc items-start w-full">
					<label htmlFor="email" className="text-neutral-400 text-sm">
						Email
					</label>
					<input
						name="email"
						id="email"
						type="email"
						required
						placeholder="hi@hack49.com"
						className="rounded-lg border border-neutral-800 px-5 py-3 w-full relative bg-neutral-950 placeholder:text-neutral-600 active:outline-none focus:outline-none text-white"
					/>
				</div>
			</div>
			{/*
	<button type="submit" className="border-neutral-800 px-5 py-3 rounded-lg bg-white text-black font-bold text-sm w-full">
	</button> */}
			<button
				type="submit"
				className="inline-flex h-12 w-full items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
			>
				Submit
			</button>

			{/* scroll down animation */}
		</form>
	);
};
``;
const SignUpWaitlist = () => {
	const calculateTimeLeft = () => {
		const difference = +new Date('10/19/2024') - +new Date();
		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				months: Math.floor(difference / (1000 * 60 * 60 * 24 * 30)),
				days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 30),
			};
		}

		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState(null);

	useEffect(() => {
		setTimeLeft(calculateTimeLeft());
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0.0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{
				delay: 0.3,
				duration: 0.8,
				ease: 'easeInOut',
			}}
			className="max-w-7xl md:max-w-md w-full lg:max-w-lg xl:max-w-3xl mx-auto md:mx-0 z-30 fc items-start"
		>
			<h1 className="relative text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-blue-300 to-blue-900 text-center font-extrabold">
				Hack49
			</h1>
			<div className="relative">
				<span className="relative z-10 mb-4 inline-block rounded-full border border-zinc-700 bg-zinc-900/20 px-3 py-1.5 text-neutral-300 md:mb-0 text-2xl font-bold">
					2024
					<span className="absolute bottom-0 left-3 right-3 h-[1px] bg-gradient-to-r from-zinc-500/0 via-zinc-300 to-zinc-500/0"></span>
				</span>
			</div>
			<p className="text-neutral-400 my-2 text-base sm:text-xl">
				Hack49 is a yearly international hackathon dedicated to fostering the creation of groundbreaking solutions to address the world's most
				complex issues.
			</p>
			{timeLeft && (
				<div className="text-white text-2xl -10">
					Hack49 2024 has ended. See you at <b>Hack49 2025</b>!
				</div>
			)}
			{/* <Link className="hover:-translate-y-1 transition-transform" href="/apply">
				<motion.button
					className="p-[3px] relative mt-3"
					whileHover={{ scale: 1.05 }}
					whileTap={{
						scale: 0.95,
						rotate: -2,
					}}
				>
					<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg" />
					<div className="px-12 py-2 fr text-xl gap-2 bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
						Apply Now <IoChevronForward />
					</div>
				</motion.button>
			</Link> */}

			<div className="my-4">
				<Socials />
			</div>
			{/*<SignUpForm />*/}

			<button
				className="w-full fr items-start gap-2 text-neutral-500 mt-4 animate-bounce"
				onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
			>
				<IoArrowDownCircle className="text-xl" />
				<p className="text-sm">Scroll Down</p>
			</button>
		</motion.div>
	);
};

export default SignUpWaitlist;
