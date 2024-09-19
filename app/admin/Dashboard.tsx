'use client';
import React from 'react';
import { Toaster } from 'sonner';
import Link from 'next/link';
import { IoChevronForward } from 'react-icons/io5';
import dynamic from 'next/dynamic';
import { Tables } from '@/database.types';
import { ScrollShadow } from '@nextui-org/react';
const SignupsChart = dynamic(() => import('./SignupsChart'), {
	ssr: false,
});

const AppChart = dynamic(() => import('./AppChart'), {
	ssr: false,
});

const Dashboard = ({
	insights,
	users,
	applications,
	referralRanking,
	countryRanking,
}: {
	insights: any;
	users: Tables<'users'>[];
	applications: Tables<'applications'>[];
	referralRanking: {
		name: string;
		referrals: number;
	}[];
	countryRanking: {
		name: string;
		applications: number;
	}[];
}) => {
	// transform insights -> title: "Total Users" into an array grouped by date and value of amount of signups
	// const bro = [
	//   ...insights.find((insight: any) => insight.title === "Total Users").data,
	// ];

	return (
		<div className="w-full h-full overflow-x-hidden justify-start fc">
			<div className="w-full max-w-7xl fc gap-10">
				<div className="fr gap-3 justify-between w-full">
					<h1 className="text-4xl text-center">Admin Dashboard</h1>
				</div>
				{/* make some UI to view and edit all the FAQS */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
					{insights.map((insight: any) => {
						return (
							<div className="bg-neutral-800 p-4 rounded-lg shadow-md fc gap-2 items-start" key={insight.title}>
								<p className="text-xl">{insight.title}</p>
								<h3 className="text-4xl">{insight.value}</h3>
							</div>
						);
					})}
					<div className="bg-neutral-800 p-4 rounded-lg shadow-md fc gap-2 items-start aspect-video">
						<ScrollShadow size={100} className="w-[300px] h-[200px]">
							{/* referral */}
							<h3 className="text-2xl">Referral Ranking</h3>
							<div className="w-full gap-3">
								{referralRanking.map((referral) => {
									return (
										<div key={referral.name} className="">
											<h3 className="text-sm">
												{referral.name} | {referral.referrals}
											</h3>
										</div>
									);
								})}
							</div>
						</ScrollShadow>
					</div>
					<div className="bg-neutral-800 p-4 rounded-lg shadow-md fc gap-2 items-start aspect-video">
						<ScrollShadow size={100} className="w-[300px] h-[200px]">
							{/* country */}
							<h3 className="text-2xl">Country Ranking</h3>
							<div className="w-full gap-3">
								{countryRanking.map((country) => {
									return (
										<div key={country.name} className="">
											<h3 className="text-sm">
												{country.name} | {country.applications}
											</h3>
										</div>
									);
								})}
							</div>
						</ScrollShadow>
					</div>
					<Link href="/admin/applications/responses" className="bg-neutral-800 p-4 rounded-lg shadow-md fc gap-2 items-start">
						<h3 className="text-2xl fr gap-2">
							View Short Answers <IoChevronForward />
						</h3>
					</Link>
					<Link href="/admin/applications" className="bg-neutral-800 p-4 rounded-lg shadow-md fc gap-2 items-start">
						<h3 className="text-2xl fr gap-2">
							View Applications <IoChevronForward />
						</h3>
					</Link>
				</div>
				<SignupsChart users={users} />
				<AppChart applications={applications} />
			</div>
			<Toaster />
		</div>
	);
};

export default Dashboard;
