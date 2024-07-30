import React from 'react';
import LoginForm from './LoginForm';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';

const LoginPage = async () => {
	const supabase = createClient();
	const { data } = await supabase.auth.getUser();
	if (data.user) {
		redirect('/dashboard');
	}
	return <LoginForm />;
};

export default LoginPage;
