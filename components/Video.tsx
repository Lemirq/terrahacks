import React from 'react';

const Video = () => {
	return (
		<video className="w-full rounded-2xl" controls>
			<source src="/Intro.mp4" />
		</video>
	);
};

export default Video;
