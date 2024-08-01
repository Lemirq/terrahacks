'use client';
import React from 'react';
import { User } from '@/node_modules/@supabase/auth-js/src/lib/types';
import Conf from '../Conf';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

const Success = ({ user }: { user: User }) => {
	return (
		<div className="w-full min-h-screen overflow-hidden relative py-36 fc">
			<Conf />
			<div className="w-full max-w-2xl mx-auto px-4">
				<h1 className="text-4xl font-bold">Your Application is Submitted, {user.user_metadata.first_name}!</h1>
				<p className="my-4">Thank you for applying to Hack49. We will review your application and get back to you soon.</p>
				<Link href="/dashboard">
					<Button color="primary" startContent={<IoArrowBack />}>
						Back to Dashboard
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default Success;
