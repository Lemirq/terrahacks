'use client';
import React from 'react';

const Loading = () => {
	return (
		<div className="fc w-full h-screen bg-neutral-950 flex items-center justify-center">
			<div className="flex flex-col items-center justify-center">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-neutral-800"></div>
				<p className="text-neutral-500 text-center">Loading...</p>
			</div>
		</div>
	);
};

export default Loading;
