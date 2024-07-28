'use client';
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { Button, Input } from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
const LoginForm = () => {
	const supabase = createClient();

	const [emailSent, setEmailSent] = useState(false);

	async function signup(formData: FormData) {
		const supabase = createClient();
		// type-casting here for convenience
		// in practice, you should validate your inputs
		const data = {
			email: formData.get('email') as string,
			password: formData.get('password') as string,
			firstName: formData.get('firstName') as string,
			lastName: formData.get('lastName') as string,
		};

		const { data: supabaseData, error } = await supabase.auth.signUp({
			email: data.email,
			password: data.password,
			options: {
				data: {
					first_name: data.firstName,
					last_name: data.lastName,
				},
			},
		});

		if (error) {
			console.error(error);
			toast.error(error.message);
			return;
		}

		console.log(supabaseData);

		// redirect('/');
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
			firstName: '',
			lastName: '',
		},
	});

	async function logout() {
		await supabase.auth.signOut();
		redirect('/login');
	}

	const errorMessages = {
		email: {
			required: 'Email is required',
		},
		password: {
			required: 'Password is required',
			minLength: 'Password must be at least 8 characters long',
		},
		firstName: {
			required: 'First name is required',
		},
		lastName: {
			required: 'Last name is required',
		},
	};

	return (
		<main className="w-full h-screen overflow-hidden py-36 fc">
			<form className="max-w-xl fc w-full fc gap-10">
				<h1 className="text-4xl text-center">Signup for Hack49!</h1>
				<div className="fc gap-3 w-full items-start">
					<Input
						label="Email"
						placeholder="Enter your email"
						description="We'll never share your email with anyone else."
						onClear={() => console.log('clear')}
						errorMessage={errors.email && 'Email is required'}
						isInvalid={!!errors.email}
						{...register('email', { required: true })}
					/>
					{/* password, firstname, lastname */}
					<Input
						label="Password"
						placeholder="Enter your password"
						onClear={() => console.log('clear')}
						errorMessage={
							errors.password && errors.password.type === 'required'
								? 'Password is required'
								: 'Password must be at least 8 characters long'
						}
						isInvalid={!!errors.password}
						{...register('password', { required: true, minLength: 8 })}
					/>
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
					<Button formAction={signup} color="primary">
						Signup
					</Button>
				</div>
			</form>
		</main>
	);
};

export default LoginForm;
