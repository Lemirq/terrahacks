'use client';
import React from 'react';
import Hero from '@/components/sections/Hero';
import MeetTheTeam from '@/components/sections/MeetTheTeam';
import About from '@/components/sections/About';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import { ReactLenis } from 'lenis/react';

export default function Home() {
	return (
		<ReactLenis
			root
			options={{
				lerp: 0.3,
			}}
		>
			<main className="w-full overflow-x-hidden bg-dot-white/[0.2] bg-neutral-950 fc">
				<Hero />
				<About />
				<MeetTheTeam />
				<FAQ />
				<Contact />
			</main>
		</ReactLenis>
	);
}
