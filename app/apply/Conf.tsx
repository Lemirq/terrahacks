import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import Confetti from 'react-confetti';
export default function Conf() {
	const [show, setShow] = React.useState(true);
	const [width, height] = [window.innerWidth, window.innerHeight];
	// use effect to unmount the component after 2 seconds
	useEffect(() => {
		setTimeout(() => {
			setShow(false);
		}, 5000);
	}, []);
	return (
		<AnimatePresence>
			{show && (
				<motion.div
					// animate the confetti
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}
					exit={{
						opacity: 0,
					}}
				>
					<Confetti className="fixed pointer-events-none" width={width} height={height} />
				</motion.div>
			)}
		</AnimatePresence>
	);
}
