import { createClient } from '@/utils/supabase/server';
import React from 'react';

const Applications = async () => {
	const supabase = createClient();
	const fetchApplications = async () => {
		const { data, error } = await supabase.from('applications').select('*');
		if (error) {
			console.error(error);
		}
		console.log(data);
		return data;
	};
	const allApplications = await fetchApplications();
	if (!allApplications) {
		return <div>Loading...</div>;
	}

	const incomingApplications = allApplications.filter((application) => application.status === 'incoming');
	return (
		<div className="fc gap-3 items-start w-full">
			<h1>Applications</h1>
		</div>
	);
};

export default Applications;
