'use client';
import React from 'react';
import { Toaster } from 'sonner';

const AppContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Toaster invert />
			{children}
		</>
	);
};

export default AppContainer;
