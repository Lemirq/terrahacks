'use client';
import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { IoLink } from 'react-icons/io5';
import { toast } from 'sonner';
const ForgotPassword = () => {
	const supabase = createClient();
	const [emailSent, setEmailSent] = useState(false);

	async function reset(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const email = e.currentTarget.email.value;
		const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: location.origin + '/auth/reset',
		});

		if (error) {
			console.error(error);
			toast.error(error.message);
		} else {
			setEmailSent(true);
		}
	}

	return (
		<main className="w-full h-screen overflow-hidden relative fc py-36">
			<AnimatePresence>
				{!emailSent && (
					<motion.form
						initial={{
							opacity: 0,
							y: 50,
						}}
						animate={{
							opacity: 1,
							y: 0,
						}}
						transition={{
							duration: 0.5,
						}}
						className="max-w-xl fc w-full items-start fc gap-5 sm:px-10 px-5 z-30"
						onSubmit={reset}
					>
						<h1 className="text-2xl sm:text-4xl text-center">Forgot Password</h1>
						<p className="text-neutral-300">Enter your email address and we'll send you a link to reset your password.</p>
						<Input label="Email" placeholder="Enter your email" onClear={() => console.log('clear')} required type="email" name="email" />
						{/* password, firstname, lastname */}

						<Button type="submit" color="primary">
							Submit
						</Button>
					</motion.form>
				)}
				{emailSent && (
					<motion.div
						initial={{
							opacity: 0,
							y: 50,
						}}
						animate={{
							opacity: 1,
							y: 0,
						}}
						transition={{
							duration: 0.5,
						}}
						className="max-w-xl fc w-full fc gap-10 sm:px-10"
					>
						<h1 className="text-2xl sm:text-4xl text-center">Check your email</h1>
						<p className="text-center">Please check your email and click the link to reset your password.</p>
						<a href="https://gmail.com">
							<Button endContent={<IoLink />} color="primary">
								Open Gmail
							</Button>
						</a>
					</motion.div>
				)}
			</AnimatePresence>
		</main>
	);
};

export default ForgotPassword;
