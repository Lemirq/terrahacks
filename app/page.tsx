'use client';
import React from 'react';
import Hero from '@/components/sections/Hero';
import MeetTheTeam from '@/components/sections/MeetTheTeam';
import About from '@/components/sections/About';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';
import { GoogleAnalytics } from '@next/third-parties/google';
import Footer from '@/components/Footer';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
export default function Home() {
	return (
		<>
			<main className="w-full overflow-x-hidden bg-dot-white/[0.2] bg-neutral-950 fc">
				<Hero />
				<About />
				<MeetTheTeam />
				<FAQ />
				<Contact />
			</main>
		</>
	);
}
