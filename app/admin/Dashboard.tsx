'use client';
import { getAllFAQs } from '@/utils/supabase/actions';
import { Button, Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import EditFAQ from './EditFAQ';
import { Toaster } from 'sonner';
import Link from 'next/link';
import { Link as NextLink } from '@nextui-org/react';
import Faqs from './FAQ';
import Waitlist from './Waitlist';

const Dashboard = ({ faqs, waitlist, categories }) => {
	const [hidden, setHidden] = useState(true);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (e.target instanceof HTMLFormElement) {
			const formData = new FormData(e.target);
			console.log(formData.get('bing'));

			if (formData.get('bing') == 'joe mama') {
				setHidden(false);
			}
		}
	};

	return (
		<div className="w-full min-h-screen overflow-x-hidden fc py-10 pt-36">
			{hidden ? (
				<form onSubmit={handleSubmit} className="fr gap-3 w-full max-w-3xl px-3 sm:px-10">
					<Input type="text" label="Enter the secret word" id="bing" name="bing" />

					<Button type="submit">Submit</Button>
				</form>
			) : (
				<div className="w-full h-full fc gap-10">
					<h1 className="text-4xl text-center">Welcome, Admin!</h1>
					{/* make some UI to view and edit all the FAQS */}
					<div className="fc w-full h-full gap-24">
						<Faqs categories={categories} initialFAQs={faqs} />
						<Waitlist waitlist={waitlist} />
					</div>

					<Button onClick={() => setHidden(true)}>Logout</Button>
				</div>
			)}
			<Toaster />
		</div>
	);
};

export default Dashboard;
