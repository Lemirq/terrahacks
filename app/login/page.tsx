import React from 'react';
import LoginForm from './LoginForm';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
	const supabase = createClient();
	const { data } = await supabase.auth.getUser();
	if (data.user) {
		redirect('/dashboard');
	}
	await new Promise((resolve) => setTimeout(resolve, 5000));
	return <LoginForm />;
};

export default LoginPage;
