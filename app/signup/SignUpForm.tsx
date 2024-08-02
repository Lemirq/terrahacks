'use client';
import React, { useEffect, useRef, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { IoEye, IoEyeOff, IoLink } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';
import { redirect } from 'next/navigation';
import Link from 'next/link';
const SignUpForm = () => {
	const supabase = createClient();

	const [buttonLoading, setButtonLoading] = useState(false);
	const [emailSent, setEmailSent] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [user, setUser] = useState(null);

	const toggleVisibility = () => setIsVisible(!isVisible);
	const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

	async function signup(formData: { email: string; password: string; firstName: string; lastName: string }) {
		setButtonLoading(true);
		// type-casting here for convenience
		// in practice, you should validate your inputs

		// check if user already exists
		const { data: userExists, error: userExistsError } = await supabase.from('users').select('*').eq('email', formData.email).single();
		if (userExists) {
			toast.error('User already exists, please login instead.');
			setButtonLoading(false);
			return;
		}

		console.log(location.origin);

		const { data: supabaseData, error } = await supabase.auth.signUp({
			email: formData.email,
			password: formData.password,
			options: {
				emailRedirectTo: location.origin,
				data: {
					first_name: formData.firstName,
					last_name: formData.lastName,
				},
			},
		});

		if (error) {
			console.error(error);
			toast.error(error.message);
			setButtonLoading(false);
			return;
		}

		console.log(supabaseData);

		if (supabaseData) {
			setUser(supabaseData.user);
			if (!supabaseData.user?.user_metadata.email_verified) {
				setEmailSent(true);
			} else {
				redirect('/dashboard');
			}
		}

		setButtonLoading(false);
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
			confirmPassword: '',
			firstName: '',
			lastName: '',
		},
	});

	const password = useRef({});
	useEffect(() => {
		console.log(password);
	}, [password]);
	password.current = watch('password', '');

	return (
		<main className="w-full h-screen overflow-hidden relative fc">
			<BackgroundGradientAnimation>
				<div className="absolute z-30 inset-0 flex items-center justify-center text-white font-bold px-5 py-36">
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
								onSubmit={handleSubmit(signup)}
								className="max-w-xl fc w-full fc gap-10 sm:px-10"
							>
								<div className="w-full fc gap-2">
									<h1 className="text-2xl sm:text-4xl text-center">Signup for Hack49!</h1>
									<p className="text-neutral-300">
										Have an account?{' '}
										<Link href="/login" className="underline text-blue-500">
											Login
										</Link>{' '}
										instead
									</p>
								</div>
								<div className="fc gap-3 w-full items-start">
									<div className="fc sm:fr gap-3 w-full sm:items-start items-start">
										<Input
											label="First Name"
											placeholder="Enter your first name"
											onClear={() => console.log('clear')}
											errorMessage={errors.firstName && 'First name is required'}
											isInvalid={!!errors.firstName}
											{...register('firstName', { required: true })}
										/>
										<Input
											label="Last Name"
											placeholder="Enter your last name"
											onClear={() => console.log('clear')}
											errorMessage={errors.lastName && 'Last name is required'}
											isInvalid={!!errors.lastName}
											{...register('lastName', { required: true })}
										/>
									</div>
									<Input
										label="Email"
										placeholder="Enter your email"
										description="We'll never share your email with anyone else."
										onClear={() => console.log('clear')}
										errorMessage={errors.email?.type === 'required' ? 'Email is required' : 'Please enter a valid email'}
										isInvalid={!!errors.email}
										{...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
									/>
									{/* password, firstname, lastname */}
									<Input
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
										errorMessage={
											errors.password && errors.password.type === 'required'
												? 'Password is required'
												: 'Password must be at least 8 characters long'
										}
										isInvalid={!!errors.password}
										{...register('password', { required: true, minLength: 8 })}
									/>

									<Input
										label="Repeat Password"
										endContent={
											<button
												className="focus:outline-none"
												type="button"
												onClick={togglePasswordVisibility}
												aria-label="toggle password visibility"
											>
												{isPasswordVisible ? (
													<IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
												) : (
													<IoEye className="text-2xl text-default-400 pointer-events-none" />
												)}
											</button>
										}
										type={isPasswordVisible ? 'text' : 'password'}
										placeholder="Enter your password again"
										errorMessage={
											errors.confirmPassword && errors.confirmPassword.type === 'required'
												? 'Password is required'
												: 'Passwords do not match'
										}
										isInvalid={!!errors.confirmPassword}
										{...register('confirmPassword', {
											required: true,
											minLength: 8,
											validate: (value) => value === password.current,
										})}
									/>
									<Button
										// disabled until form is valid
										isDisabled={Object.keys(errors).length > 0}
										isLoading={buttonLoading}
										type="submit"
										color="primary"
									>
										Signup
									</Button>
								</div>
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
								<h1 className="text-2xl sm:text-4xl text-center">Hi, {user && user.user_metadata.first_name}! Email Sent!</h1>
								<p className="text-center">Please check your email to verify your account.</p>
								<a href="https://gmail.com">
									<Button endContent={<IoLink />} color="primary">
										Open Gmail
									</Button>
								</a>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</BackgroundGradientAnimation>
		</main>
	);
};

export default SignUpForm;
