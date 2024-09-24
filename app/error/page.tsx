'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const Error = () => {
	const searchParams = useSearchParams();
	const bro = searchParams.get('message');
	// console.log(bro);
	return (
		<main className="w-full h-screen overflow-hidden fc gap-3 px-5 sm:px-10">
			<div className="fr gap-4">
				<h1 className="font-bold text-2xl">Error</h1>
				{/* vertical line */}
				<div className="w-1 h-10 bg-white/40"></div>
				<p className="text-xl text-neutral-300">{bro}</p>
			</div>
			<div>
				Head back to the{' '}
				<Link href="/" className="text-blue-500">
					homepage
				</Link>
			</div>
		</main>
	);
};

export default Error;
