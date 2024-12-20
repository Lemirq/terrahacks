'use client';
import React, { useState, useEffect } from 'react';

const Timer = () => {
	const calculateTimeLeft = () => {
		const targetDate = new Date('October 21, 2024 22:00:00 GMT-0400'); // EST
		const now = new Date();
		const difference = targetDate.getTime() - now.getTime();

		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			};
		}

		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());
	const [showTimer, setShowTimer] = useState<boolean>(false);

	useEffect(() => {
		const checkStartTime = () => {
			const startTime = new Date('October 19, 2024 12:00:00 GMT-0400'); // EST
			const now = new Date();
			if (now >= startTime) {
				setShowTimer(true);
			}
		};

		checkStartTime();
		const timer = setInterval(() => {
			checkStartTime();
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="w-full fc gap-2">
			{showTimer ? (
				<div suppressHydrationWarning className="text-lg sm:text-6xl w-full text-center fr md:gap-4">
					{timeLeft.days !== undefined ? (
						<>
							<span suppressHydrationWarning>{timeLeft.days}d </span>
							<span suppressHydrationWarning className="mx-3">
								:
							</span>
							<span suppressHydrationWarning>{timeLeft.hours}h </span>
							<span suppressHydrationWarning className="mx-3">
								:
							</span>
							<span suppressHydrationWarning>{timeLeft.minutes}m </span>
							<span suppressHydrationWarning className="mx-3">
								:
							</span>
							<span suppressHydrationWarning>{timeLeft.seconds}s</span>
						</>
					) : (
						<span>🎉 Hacking Ended!</span>
					)}
				</div>
			) : (
				<></>
			)}

			{/* timer for oct 19 10pm est */}
			{showTimer && <p>Timer for October 21, 2024 10:00 PM EST, when hacking ends.</p>}
		</div>
	);
};

export default Timer;
