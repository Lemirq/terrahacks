import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';
import ResetForm from './ResetForm';

const ResetPage = async () => {
	const supabase = createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		// 2 seconds delay before redirecting to login
		redirect('/login');
	}
	return <ResetForm user={data.user} />;
};

export default ResetPage;
