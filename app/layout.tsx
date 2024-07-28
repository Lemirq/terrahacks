import type { Metadata, Viewport } from 'next';
import '@/app/globals.css';
import '@/app/satoshi.css';
import { Providers } from './providers';

export const metadata: Metadata = {
	title: 'Hack49 Global',
	description:
		"Hack49 is a yearly international hackathon dedicated to fostering the creation of groundbreaking solutions to address the world's most",
	robots: 'follow, index',
	icons: {
		icon: '/favicon.ico',
		apple: '/favicon.ico',
	},
	openGraph: {
		type: 'website',
		url: `https://hack-49.vercel.app/`,
		images: [
			{
				url: `https://hack-49.vercel.app/images/og-image.png`,
				width: 1200,
				height: 630,
			},
		],
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
