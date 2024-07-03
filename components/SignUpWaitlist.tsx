import React from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const SignUpWaitlist = () => {
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);

		// post request to /api/mailing with body formData
		const response = await fetch('/api/mailing', {
			method: 'POST',
			body: JSON.stringify({
				name: formData.get('name'),
				email: formData.get('email'),
			}),
		});

		const data = await response.json();
		console.log(data);

		if (data.status === 'success') {
			toast.success('Thanks for signing up!', {
				description: 'We will get back to you soon. \n email: ' + formData.get('email') + '\n name: ' + formData.get('name'),
			});
		} else {
			toast.error('Something went wrong!', {
				description: data.error,
			});
		}
	};

	return (
		<div className="max-w-3xl mx-auto mt-14 z-50">
			<motion.h1 className="relative z-10 text-6xl md:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-blue-300 to-blue-900 text-center font-sans font-bold">
				Hack49
			</motion.h1>
			<h3 className="text-neutral-300 mx-auto my-2 text-2xl text-center relative z-10 mb-3 font-bold">2024</h3>
			<p className="text-neutral-400 mx-auto my-2 text-sm sm:text-xl text-center relative z-10 mb-3">
				Hack49 is a global hackathon for the public good. We are a community of builders, hackers, and makers who are passionate about the
				intersection of technology and society. Our goal is to create a more inclusive and equitable world by bringing together diverse
				perspectives and experiences.
			</p>
			<form className="fc gap-2 w-full" onSubmit={handleSubmit}>
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
							className="rounded-lg border border-neutral-800 px-5 py-3 w-full relative z-10 bg-neutral-950 placeholder:text-neutral-700 active:outline-none focus:outline-none text-white"
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
							className="rounded-lg border border-neutral-800 px-5 py-3 w-full relative z-10 bg-neutral-950 placeholder:text-neutral-700 active:outline-none focus:outline-none text-white"
						/>
					</div>
				</div>

				<button type="submit" className="border-neutral-800 px-5 py-3 rounded-lg bg-white text-black font-bold text-sm w-full">
					Submit
				</button>
			</form>
		</div>
	);
};

export default SignUpWaitlist;
