'use client';
import React from 'react';
import Hero from '@/components/sections/Hero';
import MeetTheTeam from '@/components/sections/MeetTheTeam';
import About from '@/components/sections/About';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import Animation from '@/components/Animation';
import { Sponsors } from '@/components/sections/Sponsors';
import InstaFeed from '@/components/Instagram';

export default function Home() {
	return (
		<>
			<main className="w-full bg-dot-white/[0.2] bg-neutral-950 fc">
				<Animation />
				<Hero />
				<About />
				<Sponsors />
				<MeetTheTeam />
				<InstaFeed />
				<FAQ />
				<Contact />
			</main>
		</>
	);
}
