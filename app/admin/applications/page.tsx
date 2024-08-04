import { createClient } from '@/utils/supabase/server';
import React from 'react';
import AllApps from './AllApps';

const Applications = async () => {
	const supabase = createClient();
	const fetchApplications = async () => {
		const { data, error } = await supabase.from('applications').select('*');
		if (error) {
			console.error(error);
		}
		return data;
	};
	const allApplications = await fetchApplications();
	const filteredApplications = allApplications?.filter((app) => app.complete);
	if (!allApplications) {
		return <div>Loading...</div>;
	}
	const incomingApplications = allApplications.filter((application) => application.status === 'not_started' && application.first_name);
	const inProgressApplications = allApplications.filter((application) => application.status === 'in_progress');
	const acceptedApplications = allApplications.filter((application) => application.status === 'accepted');
	const rejectedApplications = allApplications.filter((application) => application.status === 'rejected');

	return (
		<div className="fc gap-3 items-start w-full">
			<h1 className="text-2xl text-center">Applications</h1>
			<div className="w-full fc lg:fr lg:gap-10 gap-4 lg:items-stre">
				<div className="px-5 py-4 w-full bg-orange-400/40 rounded-2xl whitespace-nowrap">
					<h3 className="font-bold text-2xl">{incomingApplications.length} incoming</h3>
				</div>
				<div className="px-5 py-4 w-full bg-blue-400/40 rounded-2xl whitespace-nowrap">
					<h3 className="font-bold text-2xl">{inProgressApplications.length} in-progress</h3>
				</div>
				<div className="px-5 py-4 w-full bg-green-400/40 rounded-2xl whitespace-nowrap">
					<h3 className="font-bold text-2xl">{acceptedApplications.length} accepted</h3>
				</div>
				<div className="px-5 py-4 w-full bg-red-400/40 rounded-2xl whitespace-nowrap">
					<h3 className="font-bold text-2xl">{rejectedApplications.length} rejected</h3>
				</div>
			</div>

			{/* Table with all applications */}
			<AllApps applications={filteredApplications} />
		</div>
	);
};

export default Applications;
