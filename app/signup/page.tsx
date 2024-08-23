import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';
import SignUpForm from './SignUpForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Signup | Hack49',
	description: 'Sign up for Hack49 2024.',
};

const SignUpPage = async () => {
	const supabase = createClient();
	const { data } = await supabase.auth.getUser();
	if (data.user) {
		redirect('/dashboard');
	}
	return <SignUpForm />;
};

export default SignUpPage;
