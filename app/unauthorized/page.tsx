import { Button } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';

const Unauthorized = () => {
	return (
		<div className="max-w-xl mx-auto fc h-screen w-full fc gap-10 px-5 sm:px-10">
			<h1 className="text-2xl sm:text-4xl text-center">You are not authorized to view this page</h1>
			<Link href="/dashboard">
				<Button startContent={<IoArrowBack />}>Back to Dashboard</Button>
			</Link>
		</div>
	);
};

export default Unauthorized;
