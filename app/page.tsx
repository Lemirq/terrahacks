'use client';
import React, { useEffect, useState } from 'react';
import Hero from '@/components/sections/Hero';
import MeetTheTeam from '@/components/sections/MeetTheTeam';
import About from '@/components/sections/About';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import Animation from '@/components/Animation';
import { Sponsors } from '@/components/sections/Sponsors';
import InstaFeed from '@/components/Instagram';
import { createClient } from '@/utils/supabase/client';
import Prizing from '@/components/sections/Prizing';
import Judges from '@/components/sections/Judges';

export default function Home() {
	// fetch all applications
	const [countries, setCountries] = useState<string[]>([]);
	const s = createClient();
	useEffect(() => {
		const get = async () => {
			const { data, error } = await s.from('applications').select('country').filter('country', 'not.is', null);
			error && console.log(error);

			// make a unique value and eliminate null. Final output should be an array of unique values
			const unique = [...new Set(data.map((item) => item.country))].filter((item) => item !== null);
			setCountries(unique);
		};
		get();
	}, []);

	return (
		<>
			<main className="w-full bg-dot-white/[0.2] bg-neutral-950 fc">
				<Animation />
				<Hero countries={countries} />
				<About />
				<Sponsors />
				{/* <Prizing /> */}
				<Judges />
				<MeetTheTeam />
				{/* <InstaFeed /> */}
				<FAQ />
				<Contact />
			</main>
		</>
	);
}
