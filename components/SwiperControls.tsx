import React, { useState } from 'react';
import { useSwiper } from 'swiper/react';
import { IoPause, IoPlay } from 'react-icons/io5';
const SwiperControls = () => {
	const [paused, setPaused] = useState(false);
	const swiper = useSwiper();

	return (
		<div className="fr gap-2 mt-2 absolute -bottom-20 w-full">
			<button
				onClick={() => {
					if (paused) {
						swiper.autoplay.start();
					} else {
						swiper.autoplay.stop();
					}
					setPaused(!paused);
				}}
				className="p-4 border border-neutral-100/10 rounded-full"
			>
				{paused ? <IoPlay /> : <IoPause />}
			</button>
		</div>
	);
};

export default SwiperControls;
