'use client';
import React from 'react';
import { BackgroundBeams } from '@/components/beams';
import { World } from '@/components/globe';
import { toast } from 'sonner';

export default function Home() {
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);

		// post request to /api/mailing with body formData
		const response = await fetch('/api/mailing', {
			method: 'POST',
			body: JSON.stringify({
				name: formData.get('name'),
				email: formData.get('email'),
			}),
		});

		const data = await response.json();
		console.log(data);

		if (data.status === 'success') {
			toast.success('Thanks for your submission!', {
				description: 'We will get back to you soon.',
			});
		} else {
			toast.error('Something went wrong!', {
				description: data.error,
			});
		}
	};

	const globeConfig = {
		pointSize: 4,
		globeColor: '#1f1f1f',
		showAtmosphere: true,
		atmosphereColor: '#FFFFFF',
		atmosphereAltitude: 0.1,
		emissive: '#062056',
		emissiveIntensity: 0.1,
		shininess: 0.9,
		polygonColor: 'rgba(255,255,255,0.7)',
		ambientLight: '#38bdf8',
		directionalLeftLight: '#ffffff',
		directionalTopLight: '#ffffff',
		pointLight: '#ffffff',
		arcTime: 1000,
		arcLength: 0.9,
		rings: 1,
		maxRings: 3,
		initialPosition: { lat: 22.3193, lng: 114.1694 },
		autoRotate: true,
		autoRotateSpeed: 0.5,
	};

	const colors = ['#06b6d4', '#3b82f6', '#6366f1'];
	const sampleArcs = [
		{
			order: 1,
			startLat: -19.885592,
			startLng: -43.951191,
			endLat: -22.9068,
			endLng: -43.1729,
			arcAlt: 0.1,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 1,
			startLat: 28.6139,
			startLng: 77.209,
			endLat: 3.139,
			endLng: 101.6869,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 1,
			startLat: -19.885592,
			startLng: -43.951191,
			endLat: -1.303396,
			endLng: 36.852443,
			arcAlt: 0.5,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 2,
			startLat: 1.3521,
			startLng: 103.8198,
			endLat: 35.6762,
			endLng: 139.6503,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 2,
			startLat: 51.5072,
			startLng: -0.1276,
			endLat: 3.139,
			endLng: 101.6869,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 2,
			startLat: -15.785493,
			startLng: -47.909029,
			endLat: 36.162809,
			endLng: -115.119411,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 3,
			startLat: -33.8688,
			startLng: 151.2093,
			endLat: 22.3193,
			endLng: 114.1694,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 3,
			startLat: 21.3099,
			startLng: -157.8581,
			endLat: 40.7128,
			endLng: -74.006,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 3,
			startLat: -6.2088,
			startLng: 106.8456,
			endLat: 51.5072,
			endLng: -0.1276,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 4,
			startLat: 11.986597,
			startLng: 8.571831,
			endLat: -15.595412,
			endLng: -56.05918,
			arcAlt: 0.5,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 4,
			startLat: -34.6037,
			startLng: -58.3816,
			endLat: 22.3193,
			endLng: 114.1694,
			arcAlt: 0.7,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 4,
			startLat: 51.5072,
			startLng: -0.1276,
			endLat: 48.8566,
			endLng: -2.3522,
			arcAlt: 0.1,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 5,
			startLat: 14.5995,
			startLng: 120.9842,
			endLat: 51.5072,
			endLng: -0.1276,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 5,
			startLat: 1.3521,
			startLng: 103.8198,
			endLat: -33.8688,
			endLng: 151.2093,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 5,
			startLat: 34.0522,
			startLng: -118.2437,
			endLat: 48.8566,
			endLng: -2.3522,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 6,
			startLat: -15.432563,
			startLng: 28.315853,
			endLat: 1.094136,
			endLng: -63.34546,
			arcAlt: 0.7,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 6,
			startLat: 37.5665,
			startLng: 126.978,
			endLat: 35.6762,
			endLng: 139.6503,
			arcAlt: 0.1,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 6,
			startLat: 22.3193,
			startLng: 114.1694,
			endLat: 51.5072,
			endLng: -0.1276,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 7,
			startLat: -19.885592,
			startLng: -43.951191,
			endLat: -15.595412,
			endLng: -56.05918,
			arcAlt: 0.1,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 7,
			startLat: 48.8566,
			startLng: -2.3522,
			endLat: 52.52,
			endLng: 13.405,
			arcAlt: 0.1,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 7,
			startLat: 52.52,
			startLng: 13.405,
			endLat: 34.0522,
			endLng: -118.2437,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 8,
			startLat: -8.833221,
			startLng: 13.264837,
			endLat: -33.936138,
			endLng: 18.436529,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 8,
			startLat: 49.2827,
			startLng: -123.1207,
			endLat: 52.3676,
			endLng: 4.9041,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 8,
			startLat: 1.3521,
			startLng: 103.8198,
			endLat: 40.7128,
			endLng: -74.006,
			arcAlt: 0.5,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 9,
			startLat: 51.5072,
			startLng: -0.1276,
			endLat: 34.0522,
			endLng: -118.2437,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 9,
			startLat: 22.3193,
			startLng: 114.1694,
			endLat: -22.9068,
			endLng: -43.1729,
			arcAlt: 0.7,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 9,
			startLat: 1.3521,
			startLng: 103.8198,
			endLat: -34.6037,
			endLng: -58.3816,
			arcAlt: 0.5,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 10,
			startLat: -22.9068,
			startLng: -43.1729,
			endLat: 28.6139,
			endLng: 77.209,
			arcAlt: 0.7,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 10,
			startLat: 34.0522,
			startLng: -118.2437,
			endLat: 31.2304,
			endLng: 121.4737,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 10,
			startLat: -6.2088,
			startLng: 106.8456,
			endLat: 52.3676,
			endLng: 4.9041,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 11,
			startLat: 41.9028,
			startLng: 12.4964,
			endLat: 34.0522,
			endLng: -118.2437,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 11,
			startLat: -6.2088,
			startLng: 106.8456,
			endLat: 31.2304,
			endLng: 121.4737,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 11,
			startLat: 22.3193,
			startLng: 114.1694,
			endLat: 1.3521,
			endLng: 103.8198,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 12,
			startLat: 34.0522,
			startLng: -118.2437,
			endLat: 37.7749,
			endLng: -122.4194,
			arcAlt: 0.1,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 12,
			startLat: 35.6762,
			startLng: 139.6503,
			endLat: 22.3193,
			endLng: 114.1694,
			arcAlt: 0.2,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 12,
			startLat: 22.3193,
			startLng: 114.1694,
			endLat: 34.0522,
			endLng: -118.2437,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 13,
			startLat: 52.52,
			startLng: 13.405,
			endLat: 22.3193,
			endLng: 114.1694,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 13,
			startLat: 11.986597,
			startLng: 8.571831,
			endLat: 35.6762,
			endLng: 139.6503,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 13,
			startLat: -22.9068,
			startLng: -43.1729,
			endLat: -34.6037,
			endLng: -58.3816,
			arcAlt: 0.1,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
		{
			order: 14,
			startLat: -33.936138,
			startLng: 18.436529,
			endLat: 21.395643,
			endLng: 39.883798,
			arcAlt: 0.3,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
		},
	];
	return (
		<div className="h-screen w-full bg-neutral-950 relative fc justify-start antialiased overflow-hidden">
			<div className="max-w-3xl mx-auto p-4 mt-20 z-50">
				<h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
					TerraHacks 2024
				</h1>
				<p></p>
				<p className="text-neutral-500 mx-auto my-2 text-xl text-center relative z-10 mb-3">
					TerraHacks is a global hackathon for the public good. We are a community of builders, hackers, and makers who are passionate about
					the intersection of technology and society. Our goal is to create a more inclusive and equitable world by bringing together
					diverse perspectives and experiences.
				</p>
				<form className="fc gap-2 w-full" onSubmit={handleSubmit}>
					<div className="fr gap-2 w-full">
						<div className="fc items-start w-full">
							<label htmlFor="name" className="text-neutral-500 text-sm">
								Name
							</label>
							<input
								name="name"
								id="name"
								required
								type="text"
								placeholder="John Doe"
								className="rounded-lg border border-neutral-800 px-5 py-3 w-full relative z-10 bg-neutral-950 placeholder:text-neutral-700 active:outline-none focus:outline-none text-white"
							/>
						</div>
						<div className="fc items-start w-full">
							<label htmlFor="email" className="text-neutral-500 text-sm">
								Email
							</label>
							<input
								name="email"
								id="email"
								type="email"
								required
								placeholder="hi@terrahacks.io"
								className="rounded-lg border border-neutral-800 px-5 py-3 w-full relative z-10 bg-neutral-950 placeholder:text-neutral-700 active:outline-none focus:outline-none text-white"
							/>
						</div>
					</div>

					<button type="submit" className="border-neutral-800 px-5 py-3 rounded-lg bg-white text-black font-bold text-sm w-full">
						Submit
					</button>
				</form>
			</div>
			<div className="md:absolute w-full aspect-square top-[30vh] z-10">
				<World data={sampleArcs} globeConfig={globeConfig} />;
			</div>

			<BackgroundBeams />
		</div>
	);
}
