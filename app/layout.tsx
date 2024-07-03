import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Hack49',
	description:
		'Hack49 is a global hackathon for the public good. We are a community of builders, hackers, and makers who are passionate about the intersection of technology and society. Our goal is to create a more inclusive and equitable world by bringing together diverse perspectives and experiences.',
	robots: 'follow, index',
	icons: {
		icon: '/favicon.ico',
		apple: '/favicon.ico',
	},
	openGraph: {
		type: 'website',
		url: `https://hack-49.vercel.app/`,
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	minimumScale: 1,
	userScalable: false``,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className + ' bg-neutral-950'}>
				<Navbar />
				{children}
				<Toaster />
			</body>
		</html>
	);
}
