import React, { useState } from 'react';

const Application = ({ user }: { user: any }) => {
	return (
		<main className="w-full min-h-screen overflow-hidden relative fc">
			<div>
				<h1>Application</h1>
				<p>{user ? `Welcome, ${user.name}` : 'Loading...'}</p>
			</div>
		</main>
	);
};

export default Application;
