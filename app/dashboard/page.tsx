import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { Button, Chip } from '@nextui-org/react';
import { IoLogOut } from 'react-icons/io5';
import Link from 'next/link';
import { logout } from '../login/actions';
import { Suspense, use } from 'react';
import Referral from './Referral';
import Perks from './Perks';
import { LuLoader } from 'react-icons/lu';
import { Metadata } from 'next';
import { FaDiscord } from 'react-icons/fa6';
import Image from 'next/image';
import Accepted from './Accepted';
import Timer from './Timer';

// metadata for this page
export const metadata: Metadata = {
	title: 'Dashboard | Hack49',
	description: 'Your dashboard for Hack49 2024.',
};

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
	const { data: userData, error: userError } = await supabase.from('applications').select('*').eq('user_id', data.user.id);
	if (userError) {
		console.error(userError.message);
	}
	// console.log(userData);

	// get referral code
	const { data: referralData, error: referralError } = await supabase.from('referrals').select('*').eq('user_id', data.user.id);
	if (referralError) {
		console.error(referralError.message);
	}
	// console.log(referralData);
	//

	const generateHeading = () => {
		if (userData?.length === 0) return 'Application not started';
		if (userData && userData[0].complete && !['accepted', 'rejected'].includes(userData[0].status)) return 'Application submitted';
		if (userData && userData[0].status === 'accepted') return 'Application accepted';
		if (userData && userData[0].status === 'rejected') return 'Application rejected';
		if (userData && userData?.length > 0) return 'Application in progress';
	};

	const generateSubHeading = () => {
		if (userData?.length === 0) return 'You have not started your application yet.';
		if (userData && userData[0].complete && !['accepted', 'rejected'].includes(userData[0].status)) return 'Your application has been submitted.';
		if (userData && userData[0].status === 'accepted') return 'Congratulations! Your application has been accepted.';
		if (userData && userData[0].status === 'rejected') return 'Your application has been rejected.';
		if (userData && userData?.length > 0) return 'Your application is in progress.';
	};

	const getChipColor = () => {
		if (userData?.length === 0) return 'default';
		if (userData && userData[0].complete && !['accepted', 'rejected'].includes(userData[0].status)) return 'success';
		if (userData && userData[0].status === 'accepted') return 'success';
		if (userData && userData[0].status === 'rejected') return 'danger';
		if (userData && userData?.length > 0) return 'primary';
	};

	const generateButtonText = () => {
		if (userData?.length === 0) return 'Start Application';
		if (userData && userData[0].complete && !['accepted', 'rejected'].includes(userData[0].status)) return 'View Application';
		if (userData && userData[0].status === 'accepted') return 'View Application';
		if (userData && userData[0].status === 'rejected') return 'View Application';
		if (userData && userData?.length > 0) return 'Continue Application';
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
				{/* message for motivation to make a project */}
				<p className="text-lg">
					We are excited to have you on board for Hack49 2024! We can't wait to see what you build. Remember, the best projects are those
					that solve real-world problems. Good luck!
				</p>
				<Timer />
				<div className="fr gap-3 w-full items-stretch">
					<Link
						href="https://discord.gg/cgBYcqnvVy"
						className="w-full py-5 px-5 sm:px-10 fr gap-5 rounded-2xl border border-neutral-300/30 bg-neutral-900 mt-5 hover:bg-indigo-400 transition-colors text-4xl"
					>
						<FaDiscord />
					</Link>
					<Link
						href="https://dorahacks.io/hackathon/hack49-2024"
						className="w-full py-5 px-5 sm:px-10 fr gap-5 rounded-2xl border border-neutral-300/30 bg-neutral-900 mt-5 hover:bg-orange-400 transition-colors text-4xl"
					>
						<Image src="/images/sponsors/dora.svg" alt="Dorahacks logo" width={200} height={50} />
					</Link>
				</div>

				{userData && userData.length > 0 && userData[0].status === 'accepted' && <Accepted />}

				{userData && userData.length > 0 && userData[0].status === 'accepted' && (
					<Referral user={data.user} refCode={referralData} app={userData[0]} />
				)}
				<section className="w-full py-5 px-5 sm:px-10 fc gap-5 items-start md:fr justify-between rounded-2xl border border-neutral-300/30 bg-neutral-900 mt-5">
					<div className="fc gap-3 items-start w-full">
						<Chip color={getChipColor()}>Application Status</Chip>
						<h2 className="text-4xl font-bold">{generateHeading()}</h2>
						<p>
							{/* similar one to heading */}
							{generateSubHeading()}
						</p>
						<p className="text-neutral-300">
							Application due date: <span className="text-white font-bold">October 10, 2024</span>
						</p>
					</div>
					<Link href="/apply">
						<Button variant="shadow" color="primary">
							{generateButtonText()}
						</Button>
					</Link>
				</section>
				{/* {userData && userData[0] && userData[0].status === "accepted" && (
          <Suspense
            fallback={
              <section className="w-full py-5 px-5 sm:px-10 fc gap-5 rounded-2xl border border-neutral-300/30 bg-neutral-900 mt-5">
                <p className="text-xl  fr">
                  <LuLoader className="animate-spin mr-2" /> Loading your
                  perks...
                </p>
              </section>
            }
          >
            <Perks user={data.user} app={userData[0]} />
          </Suspense>
        )} */}

				{/* {userData && userData[0].status !== 'accepted' && <Referral user={data.user} refCode={referralData} app={userData[0]} />} */}

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
				<section className="sm:px-10 w-full">
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
