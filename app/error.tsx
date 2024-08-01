'use client';

import { useState } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	const [showDetails, setShowDetails] = useState(false);
	return (
		<div className="fc z-50 h-screen w-full gap-2 bg-transparent p-6 overflow-hidden">
			<div className="fc gap-2">
				<h2 className="text-2xl">Something went wrong!</h2>
			</div>
		</div>
	);
}
