import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { Button, Chip } from '@nextui-org/react';
import { IoLogOut } from 'react-icons/io5';
import Link from 'next/link';
import { logout } from '../login/actions';
import { use } from 'react';

const articles = [
	{
		title: 'Ultimate Hackathon Guide for Beginners in 2024',
		description: "A beginner's guide to participating in hackathons and make a great impression.",
		link: 'https://taikai.network/blog/hackathon-beginners-guide',
	},
	{
		title: 'Ultimate 8 Step Guide to Winning Hackathons',
		description: 'Gary-Yau Chan shares his top tips for winning hackathons after attending 55 of them.',
		link: 'https://medium.com/garyyauchan/ultimate-8-step-guide-to-winning-hackathons-84c9dacbe8e',
	},
];

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

	const generateHeading = () => {
		if (userData?.length === 0) return 'Application not started';
		if (userData && userData[0].complete && userData[0].status == 'not_started') return 'Application submitted';
		if (userData && userData[0].status === 'accepted') return 'Application accepted';
		if (userData && userData[0].status === 'rejected') return 'Application rejected';
		if (userData && userData?.length > 0) return 'Application in progress';
	};

	const generateSubHeading = () => {
		if (userData?.length === 0) return 'You have not started your application yet.';
		if (userData && userData[0].complete && userData[0].status == 'not_started') return 'Your application has been submitted.';
		if (userData && userData[0].status === 'accepted') return 'Congratulations! Your application has been accepted.';
		if (userData && userData[0].status === 'rejected') return 'Your application has been rejected.';
		if (userData && userData?.length > 0) return 'Your application is in progress.';
	};

	const getChipColor = () => {
		if (userData?.length === 0) return 'default';
		if (userData && userData[0].complete && userData[0].status == 'not_started') return 'success';
		if (userData && userData[0].status === 'accepted') return 'success';
		if (userData && userData[0].status === 'rejected') return 'danger';
		if (userData && userData?.length > 0) return 'primary';
	};
	return (
		<main className="w-full min-h-screen py-36 fc px-5 sm:px-10">
			<div className="w-full min-h-screen max-w-5xl mx-auto fc justify-start items-start h-full gap-2">
				<div className="fc gap-3 sm:fr items-start sm:justify-between w-full">
					<h1 className="text-3xl font-bold">Welcome, {data.user.user_metadata.first_name}!</h1>
					<form>
						<Button type="submit" formAction={logout} color="danger" variant="ghost" startContent={<IoLogOut className="rotate-180" />}>
							Logout
						</Button>
					</form>
				</div>
				<p>Let's dive into your application journey.</p>
				<div className="w-full py-5 px-5 sm:px-10 fc gap-5 items-start md:fr justify-between rounded-2xl border border-neutral-300/30 bg-neutral-900 mt-5">
					<div className="fc gap-3 items-start w-full">
						<Chip color={getChipColor()}>Application Status</Chip>
						<h2 className="text-4xl font-bold">{generateHeading()}</h2>
						<p>
							{/* similar one to heading */}
							{generateSubHeading()}
						</p>
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

				<section className="mt- sm:px-10 p-5 w-full">
					<h3 className="text-2xl">Your Profile</h3>
					<div>
						<p className="text-lg">Name: {data.user.user_metadata.first_name + ' ' + data.user.user_metadata.last_name}</p>
						<p className="text-lg mb-3">Email: {data.user.email}</p>
						<Link href="/reset">
							<Button variant="flat" color="primary">
								Reset Password
							</Button>
						</Link>
					</div>
				</section>

				{/* resources to help you succeed */}
				<section className="sm:px-10  w-full">
					<h3 className="text-2xl mb-3">Resources</h3>
					<div className="fc gap-5">
						{articles.map((article, index) => (
							<div key={index} className="w-full bg-neutral-900/60 p-5 rounded-xl">
								<h4 className="text-lg font-bold">{article.title}</h4>
								<p className="mb-5">{article.description}</p>
								<Link href={article.link}>
									<Button variant="flat" color="primary">
										Read Article
									</Button>
								</Link>
							</div>
						))}
					</div>
				</section>
			</div>
		</main>
	);
}
