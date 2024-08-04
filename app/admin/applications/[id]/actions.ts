'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const approve = async (formData: FormData) => {
	const origin = formData.get('origin') as string;
	const supabase = createClient();
	await supabase.from('applications').update({ status: 'accepted' }).eq('user_id', formData.get('id'));
	const { data, error } = await supabase.from('users').select('*').eq('uid', formData.get('id')).single();
	if (error) {
		console.error(error);
		return;
	}
	// send email
	const fetched = await fetch(origin + '/api/mailing', {
		method: 'POST',
		body: JSON.stringify({
			name: data?.firstName,
			email: data?.email,
			type: 'accepted',
		}),
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	});

	console.log(await fetched.json());

	redirect('/admin/applications');
};

export const reject = async (formData: FormData) => {
	const supabase = createClient();
	const origin = formData.get('origin') as string;
	await supabase.from('applications').update({ status: 'rejected' }).eq('user_id', formData.get('id'));
	const { data, error } = await supabase.from('users').select('*').eq('uid', formData.get('id')).single();
	if (error) {
		console.error(error);
		return;
	}
	// send email
	const fetched = await fetch(origin + '/api/mailing', {
		method: 'POST',
		body: JSON.stringify({
			name: data?.firstName,
			email: data?.email,
			type: 'rejected',
		}),
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	});

	console.log(await fetched.json());

	redirect('/admin/applications');
};
