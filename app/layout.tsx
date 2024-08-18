import type { Metadata, Viewport } from 'next';
import '@/app/globals.css';
import '@/app/satoshi.css';
import { Providers } from './providers';
import Footer from '@/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';

import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';
import { createClient } from '@/utils/supabase/server';

export const metadata: Metadata = {
	title: 'Hack49 Global',
	description:
		"Hack49 is a yearly international hackathon dedicated to fostering the creation of groundbreaking solutions to address the world's most complex issues.",
	keywords:
		'hackathon, hack49, hack49 global, hack49 hackathon, hack49 global hackathon, hack49 hackathon global, hack 49, innovation, technology, hackathon 2022, hack49 2022, hack49 global 2022, hack49 hackathon 2022, hack49 global hackathon 2022, hack49 hackathon global 2022, hack 49 2022, innovation 2022, technology 2022, hackathon 2023, hack49 2023, hack49 global 2023, hack49 hackathon 2023, hack49 global hackathon 2023, hack49 hackathon global 2023, hack 49 2023, innovation 2023, technology 2023',
	robots: 'follow, index',
	icons: {
		icon: '/favicon.ico',
		apple: '/favicon.ico',
	},
	openGraph: {
		type: 'website',
		url: `https://hack49.com/`,
		images: [
			{
				url: `https://hack49.com/images/og-image.png`,
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

export default async function PublicLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<html lang="en" className="bg-neutral-950">
			<body className={'font-satoshi dark text-foreground bg-dot-white/[0.2] bg-neutral-950'}>
				<Navbar sUser={user} />
				<Providers>{children}</Providers>
				<Toaster richColors />
				<GoogleAnalytics gaId="G-DJNEVNJYM7" />
				<Footer />
			</body>
		</html>
	);
}
