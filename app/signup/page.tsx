import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';
import SignUpForm from './SignUpForm';

const SignUpPage = async () => {
	const supabase = createClient();
	const { data } = await supabase.auth.getUser();
	if (data.user) {
		redirect('/dashboard');
	}
	return <SignUpForm />;
};

export default SignUpPage;
