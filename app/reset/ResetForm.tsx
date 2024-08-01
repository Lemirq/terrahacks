'use client';
import { createClient } from '@/utils/supabase/client';
import { Button, Input } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoArrowForward, IoEye, IoEyeOff } from 'react-icons/io5';
import { toast } from 'sonner';
import { User } from '@/node_modules/@supabase/auth-js/src/lib/types';

const ResetForm = ({ user }: { user: User }) => {
	const [done, setDone] = useState(false);
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
			password: '',
			confirmPassword: '',
		},
	});
	const [isVisible, setIsVisible] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
	const supabase = createClient();
	const res = async (formData: { password: string; confirmPassword: string }) => {
		setButtonLoading(true);
		const { data, error } = await supabase.auth.updateUser({
			password: formData.password,
		});
		if (error) {
			console.error(error);
			toast.error(error.message);
			setButtonLoading(false);
			return;
		}

		if (data) {
			setDone(true);
		}
	};

	const password = useRef({});
	password.current = watch('password', '');

	return (
		<main className="w-full h-screen overflow-hidden relative fc py-36">
			<AnimatePresence>
				{!done && (
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
						onSubmit={handleSubmit(res)}
					>
						<h1 className="text-2xl sm:text-4xl text-center">Reset Password</h1>
						<p className="text-sm">
							Changing password for <span className="font-bold">{user.email}</span>
						</p>
						<Input
							label="New Password"
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
							placeholder="Enter your new password"
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
							placeholder="Enter your new password again"
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
						<Button isLoading={buttonLoading} type="submit" color="primary">
							Reset Password
						</Button>
					</motion.form>
				)}
				{done && (
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
						<h1 className="text-2xl sm:text-4xl text-center">Your password has been reset.</h1>
						<Link href="/login">
							<Button endContent={<IoArrowForward />}>Continue to Dashboard</Button>
						</Link>
					</motion.div>
				)}
			</AnimatePresence>
		</main>
	);
};

export default ResetForm;
