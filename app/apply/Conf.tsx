import React from 'react';
import Confetti from 'react-confetti';
export default function Conf() {
	const [width, height] = [window.innerWidth, window.innerHeight];
	return <Confetti className="fixed pointer-events-none" width={width} height={height} />;
}
