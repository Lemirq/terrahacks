'use client';
import React from 'react';
import { Toaster } from 'sonner';
import Waitlist from './Waitlist';
import { User } from '@/node_modules/@supabase/auth-js/src/lib/types';

const Dashboard = ({ waitlist, user }: { user: User; waitlist: any }) => {
	return (
		<div className="w-full min-h-screen overflow-x-hidden fc">
			<div className="w-full max-w-7xl h-full fc gap-10">
				<div className="fr gap-3 justify-between w-full">
					<h1 className="text-4xl text-center">Welcome, {user.user_metadata.first_name}!</h1>
				</div>
				{/* make some UI to view and edit all the FAQS */}
				<div className="fc w-full h-full gap-24">
					<Waitlist waitlist={waitlist} />
				</div>
			</div>
			<Toaster />
		</div>
	);
};

export default Dashboard;
