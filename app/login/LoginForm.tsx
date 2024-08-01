'use client';
import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { IoEyeOff, IoEye, IoLink, IoArrowForward } from 'react-icons/io5';
import { Button, Input } from '@nextui-org/react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
const LoginForm = () => {
	const supabase = createClient();
	const [buttonLoading, setButtonLoading] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [user, setUser] = useState(null);
	const toggleVisibility = () => setIsVisible(!isVisible);

	async function login(formData: { email: string; password: string }) {
		setButtonLoading(true);
		// type-casting here for convenience
		// in practice, you should validate your inputs

		const { error } = await supabase.auth.signInWithPassword(formData);

		if (error) {
			console.error(error);
			toast.error(error.message);
			setButtonLoading(false);
			return;
		}

		// set user to state
		const { data } = await supabase.auth.getUser();
		setUser(data.user);
	}

	const {
		register,
		handleSubmit,
		control,
		watch,
		reset,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		defaultValues: {
			email: '',
			password: '',
		},
	});

	return (
		<main className="w-full h-screen overflow-hidden relative fc py-36">
			<AnimatePresence>
				{!user && (
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
						onSubmit={handleSubmit(login)}
					>
						<h1 className="text-2xl sm:text-4xl text-center">Login</h1>
						<p className="text-neutral-300">
							Don't have an account?{' '}
							<Link href="/signup" className="underline text-blue-500">
								Sign Up
							</Link>{' '}
							instead
						</p>
						<Input
							label="Email"
							placeholder="Enter your email"
							description="We'll never share your email with anyone else."
							onClear={() => console.log('clear')}
							errorMessage={
								errors.email?.type === 'required' ? 'Email is required' : errors.email?.type === 'pattern' && 'Email is invalid'
							}
							isInvalid={!!errors.email}
							{...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
						/>
						{/* password, firstname, lastname */}
						<Input
							isRequired
							label="Password"
							endContent={
								<button
									className="focus:outline-none"
									type="button"
									onClick={toggleVisibility}
									aria-label="toggle password visibility"
								>
									{isVisible ? (
										<IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
									) : (
										<IoEye className="text-2xl text-default-400 pointer-events-none" />
									)}
								</button>
							}
							type={isVisible ? 'text' : 'password'}
							placeholder="Enter your password"
							errorMessage={errors.password && 'Password is required'}
							isInvalid={!!errors.password}
							{...register('password', { required: true })}
						/>
						<div className="w-full fr justify-end">
							<Link href="/forgot">Forgot Password?</Link>
						</div>
						<Button isLoading={buttonLoading} type="submit" color="primary">
							Login
						</Button>
					</motion.form>
				)}
				{user && (
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
						<h1 className="text-2xl sm:text-4xl text-center">Welcome, {user.user_metadata.first_name}!</h1>
						<Link href="/dashboard">
							<Button endContent={<IoArrowForward />}>Continue to Dashboard</Button>
						</Link>
					</motion.div>
				)}
			</AnimatePresence>
		</main>
	);
};

export default LoginForm;
