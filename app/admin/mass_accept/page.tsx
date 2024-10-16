'use client';

import { Tables } from '@/database.types';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const MassAcceptance = () => {
	const supabase = createClient();
	const [ca, setCurrentApplication] = useState<Tables<'applications'> | null>(null);
	const [applications, setApplications] = useState<Tables<'applications'>[]>([]);

	const fetchAllApplications = async () => {
		const { data, error } = await supabase
			.from('applications')
			.select('*')
			.eq('complete', 'true')
			.neq('status', 'accepted')
			.order('created_at', { ascending: true });
		console.log(data);
		if (error) {
			showError(error);
			return;
		}
		console.log(data);
		setApplications(data);

		// set the current application
		setCurrentApplication(data[0]);
	};

	const showError = (error: any) => {
		console.error(error);
		toast.error('An error occurred', {
			description: error.message,
		});
	};

	const approve = async () => {
		if (!ca) return;
		const { data, error } = await supabase.from('applications').update({ status: 'accepted' }).eq('user_id', ca?.user_id).select('*').single();
		if (error) {
			showError(error);
			return;
		}

		if (data.status === 'accepted') {
			toast.success('Application approved');
		}

		// send the acceptance email
		const fetched = await fetch(origin + '/api/mailing', {
			method: 'POST',
			body: JSON.stringify({
				name: data?.first_name,
				email: 'sharmavihaan190@gmail.com',
				type: 'accepted',
			}),
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		});

		const res = await fetched.json();
		if (res.error) {
			// revert back to previous state
			const { data, error } = await supabase
				.from('applications')
				.update({ status: 'not_started' })
				.eq('user_id', ca?.user_id)
				.select('*')
				.single();
			if (error) {
				showError(error);
				return;
			}
			showError(res.error);
			toast.error('Reverted status');
		}

		await fetchAllApplications();
	};

	useEffect(() => {
		fetchAllApplications();
	}, []);

	if (applications.length === 0) {
		return <p>Loading</p>;
	}
	return (
		<main className="fr gap-10 justify-start items-start w-full py-24 min-h-screen">
			<div className="fc gap-3 text-3xl">
				<h1>Mass Acceptance</h1>
				{/* remaining */}
				<p>{applications.length} applications remaining</p>
			</div>

			{/* show current application */}
			{ca && (
				<div className="fc items-start w-full">
					<h2>Current Application</h2>
					<p>{ca.first_name + ' ' + ca.last_name}</p>
					<p>{ca.email}</p>
					<p>hackathons_attended: {ca.hackathons_attended}</p>
					<p>{ca.status}</p>
					<Button onClick={approve}>Approve</Button>
				</div>
			)}
		</main>
	);
};

export default MassAcceptance;
