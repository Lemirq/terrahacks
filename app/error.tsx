'use client';

import { Button } from '@nextui-org/react';
import * as Sentry from '@sentry/nextjs';
import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
	useEffect(() => {
		Sentry.captureException(error);
	}, [error]);

	return (
		<div className="fc z-50 h-screen w-full gap-2 bg-transparent p-6 overflow-hidden fixed inset-0 bg-black">
			<div className="fc gap-2 max-w-xl text-center">
				<h2 className="text-2xl">Something went wrong!</h2>
				<p>It's not you, it's us. We've been notified of the issue and will get it fixed as soon as possible.</p>
				<Link href="/">
					<Button>Go to home</Button>
				</Link>
			</div>
		</div>
	);
}
