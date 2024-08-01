import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { Button, Chip } from '@nextui-org/react';
import { IoLogOut } from 'react-icons/io5';
import Link from 'next/link';
import { logout } from '../login/actions';

export default async function PrivatePage() {
	const supabase = createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		// 2 seconds delay before redirecting to login
		redirect('/login');
	}

	// get application status
	const { data: userData, error: userError } = await supabase.from('applications').select().eq('user_id', data.user.id);
	if (userError) {
		console.error(userError.message);
	}
	console.log(userData);

	return (
		<main className="w-full min-h-screen py-36 fc px-5 sm:px-10">
			<div className="w-full min-h-screen max-w-5xl mx-auto fc justify-start items-start h-full gap-2">
				<div className="fc sm:fr items-start sm:justify-between w-full">
					<h1 className="text-3xl font-bold">Welcome, {data.user.user_metadata.first_name}!</h1>
					<form>
						<Button type="submit" formAction={logout} color="danger" variant="ghost" startContent={<IoLogOut className="rotate-180" />}>
							Logout
						</Button>
					</form>
				</div>
				<p>Let's dive into your application journey.</p>
				<div className="w-full py-5 px-10 fc gap-5 items-start sm:fr justify-between rounded-2xl border border-neutral-300/30 bg-neutral-900 mt-5">
					<div className="fc gap-3 items-start w-full">
						<Chip>Application Status</Chip>
						<h2 className="text-4xl font-bold">
							{userData?.length === 0
								? 'Application not started'
								: userData && userData[0].complete
								? 'Application submitted'
								: 'Application in progress'}
						</h2>
						<p className="text-neutral-300">
							Application due date: <span className="text-white font-bold">30th September 2024</span>
						</p>
					</div>
					<Link href="/apply">
						<Button variant="shadow" color="primary">
							{userData?.length === 0
								? 'Start Application'
								: userData && userData[0].complete
								? 'View Application'
								: 'Continue Application'}
						</Button>
					</Link>
				</div>
			</div>
		</main>
	);
}
