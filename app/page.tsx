'use client';
import React from 'react';
import Hero from '@/components/sections/Hero';
import MeetTheTeam from '@/components/sections/MeetTheTeam';
import About from '@/components/sections/About';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import { ReactLenis } from 'lenis/react';
import Animation from '@/components/Animation';
import { Sponsors } from '@/components/sections/Sponsors';
import Example from '@/components/sections/Carousel';

export default function Home() {
	return (
		<>
			<ReactLenis root>
				<main className="w-full bg-dot-white/[0.2] bg-neutral-950 fc">
					<Animation />
					<Hero />
					 {/*<Example />*/}
					<About />
					<Sponsors />
					<MeetTheTeam />
					<FAQ />
					<Contact />
				</main>
			</ReactLenis>
		</>
	);
}
