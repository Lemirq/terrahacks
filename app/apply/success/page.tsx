import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';
import Success from './Success';

const SuccessPage = async () => {
	const supabase = createClient();
	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();
	if (userError) {
		redirect('/login');
	}
	if (!user) {
		redirect('/login');
	}

	const { data, error } = await supabase.from('applications').select('*').eq('user_id', user.id);
	console.log(data);
	if (data?.length === 0) {
		redirect('/apply');
	}
	if (data && !data[0].complete) {
		redirect('/apply');
	}

	return <Success user={user} />;
};

export default SuccessPage;
