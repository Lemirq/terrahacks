import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TextEffect } from './ui/text-effect';
import { cn } from '@/utils/cn';
const Animation = () => {
	const [visible, setVisible] = useState(true);
	// on mount, disable scroll
	useEffect(() => {
		if (!visible) {
			document.body.style.overflow = 'initial';
		} else {
			document.body.style.overflow = 'hidden';
		}
	}, [visible]);
	useEffect(() => {
		setTimeout(() => {
			setVisible(false);
		}, 1300);
	}, []);

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					initial={{ opacity: 1 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={cn('w-screen min-h-screen fixed inset-0 overflow-hidden bg-black/40 fc z-50 backdrop-blur-2xl', {
						'hidden pointer-events-none': !visible,
					})}
				>
					<TextEffect className="text-7xl text-center font-bold tracking-wide" preset="scale" per="char">
						Hack49 Global
					</TextEffect>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Animation;
