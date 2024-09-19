import { createClient } from '@/utils/supabase/server';
import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import AllApps from './AllApps';

interface ApplicationsProps {
	searchParams: {
		oldest_first: 'true' | 'false';
		status: string;
		exclude: string;
		limit: number;
		completed_only: 'true' | 'false';
	};
}

const Applications = async ({ searchParams }: ApplicationsProps) => {
	const supabase = createClient();
	// make search params for oldest first, application status filtering, etc

	// get params
	const oldest_first = searchParams.oldest_first;
	const exclude = searchParams.exclude;
	console.log(searchParams.limit);
	const limit = searchParams.limit;
	const completed_only = searchParams.completed_only;

	// statuses are: not_started, in_progress, accepted, rejected
	const statuses = ['not_started', 'in_progress', 'accepted', 'rejected'];
	// remove excluded statuses from statuses
	let filteredStatuses = null;
	if (exclude) {
		filteredStatuses = statuses.filter((status) => !exclude.includes(status));
	}

	const fetchApplications = async () => {
		let query = supabase
			.from('applications')
			.select('*')
			.order('created_at', { ascending: oldest_first !== 'true' ? false : true });

		if (filteredStatuses) query = query.in('status', filteredStatuses);
		if (completed_only) query = query.filter('complete', 'eq', completed_only === 'true');
		if (limit) query = query.limit(limit);

		const { data, error } = await query;

		if (error) {
			console.error(error);
		}
		return data;
	};
	const allApplications = await fetchApplications();
	if (!allApplications) {
		return <div>Loading...</div>;
	}

	let filteredApplications = allApplications.filter((application) => application.complete);
	// apply search params

	if (exclude) {
		// will be comma separated string
		const statuses = exclude.split(',');
		filteredApplications = filteredApplications.filter((application) => !statuses.includes(application.status));
	}

	const incomingApplications = allApplications.filter((application) => application.status === 'not_started' && application.first_name);
	const acceptedApplications = allApplications.filter((application) => application.status === 'accepted');
	const rejectedApplications = allApplications.filter((application) => application.status === 'rejected');

	const incompleteApplications = allApplications.filter((application) => !application.complete);

	return (
		<div className="fc gap-3 items-start w-full">
			<div className="fr gap-2">
				<Link href="/admin">
					<Button>Back</Button>
				</Link>
				<h1 className="text-2xl text-center">Applications</h1>
			</div>
			<div className="w-full fr flex-wrap justify-start gap-4">
				<div className="px-5 py-4 bg-blue-400/40 rounded-2xl whitespace-nowrap">
					<h3 className="font-bold text-xl">{allApplications.length} total</h3>
				</div>
				<div className="px-5 py-4 bg-blue-400/40 rounded-2xl whitespace-nowrap">
					<h3 className="font-bold text-xl">{incompleteApplications.length} incomplete</h3>
				</div>
				<div className="px-5 py-4 bg-orange-400/40 rounded-2xl whitespace-nowrap">
					<h3 className="font-bold text-xl">{allApplications.length - incompleteApplications.length} completed</h3>
				</div>
				<div className="px-5 py-4 bg-green-400/40 rounded-2xl whitespace-nowrap">
					<h3 className="font-bold text-xl">{acceptedApplications.length} accepted</h3>
				</div>
				<div className="px-5 py-4 bg-red-400/40 rounded-2xl whitespace-nowrap">
					<h3 className="font-bold text-xl">{rejectedApplications.length} rejected</h3>
				</div>
			</div>

			{/* Table with all applications */}
			<AllApps applications={filteredApplications} />
		</div>
	);
};

export default Applications;
