'use client';
import React from 'react';
import { motion } from 'framer-motion';
const Loading = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fc w-full h-screen bg-neutral-950 flex items-center justify-center"
		>
			<div className="flex flex-col items-center gap-3 justify-center">
				<div className="animate-spin rounded-full h-24 w-24 border-t-2 border-neutral-400"></div>
				<div className="trinity-rings-spinner">
					<div className="circle"></div>
					<div className="circle"></div>
					<div className="circle"></div>
				</div>
				<p className="text-neutral-500 text-center text-xl">Loading...</p>
			</div>
		</motion.div>
	);
};

export default Loading;
