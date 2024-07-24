import type { Metadata, Viewport } from 'next';
import '@/app/globals.css';
import '@/app/satoshi.css';
import { Providers } from './providers';

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
	userScalable: false,
};

export default function PublicLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={'font-satoshi dark text-foreground bg-dot-white/[0.2] bg-neutral-950'}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
