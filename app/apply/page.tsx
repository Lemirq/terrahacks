import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';
import dynamic from 'next/dynamic';
import ViewApplication from './ViewApplication';

const Application = dynamic(() => import('./Application'), { ssr: false });

const ApplicationPage = async () => {
	const supabase = createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		// 2 seconds delay before redirecting to login
		redirect('/login');
		return; // Return early to prevent rendering the page
	}

	// check applications
	const { data: app, error: appError } = await supabase.from('applications').select('*').eq('user_id', data.user.id).single();

	if (app?.complete) {
		const { data: resume, error: resumeError } = await supabase.storage.from(`resumes`).list(data.user.id, {
			limit: 1,
		});
		// get rid of all objects from resume that have the key of 'name' starting with a period
		const finalList = resume
			? resume.filter((obj) => {
					return !Object.keys(obj).some((key) => key.startsWith('.'));
			  })
			: [];

		const { data: url } = await supabase.storage.from('resumes').getPublicUrl(`${data.user.id}/${finalList[0].name}`);

		console.log(url);
		return <ViewApplication data={app} resume={{ url: url.publicUrl, name: finalList[0] && finalList[0].name }} />;
	}

	return <Application user={data.user} />;
};

export default ApplicationPage;
