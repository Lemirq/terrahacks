import React from 'react';

const Video = () => {
	return (
		<div className="w-full">
			<iframe
				src="https://www.youtube.com/embed/-GKys0qIzTs?si=vXGdePA9PgdnPymH"
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerPolicy="strict-origin-when-cross-origin"
				allowFullScreen
				className="w-full aspect-video"
			></iframe>
		</div>
	);
};

export default Video;
