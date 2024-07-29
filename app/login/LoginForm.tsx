'use client';
import Navbar from '@/components/Navbar';
import React from 'react';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { toast } from 'sonner';

const LoginForm = () => {
	const supabase = createClient();
	async function login(formData: FormData) {
		// type-casting here for convenience
		// in practice, you should validate your inputs
		const data = {
			email: formData.get('email') as string,
			password: formData.get('password') as string,
		};

		const { error } = await supabase.auth.signInWithPassword(data);

		if (error) {
			toast.error(error.message);
			return;
		}

		redirect('/dashboard');
	}

	return (
		<main className="w-full h-screen overflow-hidden pt-36">
			<form className="max-w-xl"></form>
			<form>
				<label htmlFor="email">Email:</label>
				<input id="email" name="email" type="email" required />
				<label htmlFor="password">Password:</label>
				<input id="password" name="password" type="password" required />
				<button formAction={login}>Log in</button>
			</form>
		</main>
	);
};

export default LoginForm;
