import React from 'react';

const Video = () => {
	return (
		<video className="w-full rounded-2xl" controls>
			<source src="/newFinalVid.mp4" />
		</video>
	);
};

export default Video;
