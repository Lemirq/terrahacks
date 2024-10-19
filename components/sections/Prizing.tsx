import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/utils/cn';
// Overall Prizes:

// 1st Place: +$150 on top of the theme prize, a Saturn 4 Resin 3D Printer (Resin included)

// 2nd Place: +$100 on top of the theme prize, a Mars 5 Resin 3D Printer (Resin included)

// 3rd Place: +$50 on top of the theme prize

// For each of the three themes, we’ll also have the following prizes:

// 1st Place: $100 cash

// 2nd Place: $50 cash

// 3rd Place: $25 cash

// In our Neurotech category, the prizes are as follows:

// 1st Place: 1x Ganglion + Headband Kit

// 2nd Place: 1x Headband Kit

// 3rd Place: EmotiBit

// make json file for this

const overallPrizes = [
	{
		place: '2nd Place',
		prize: '+$100 on top of the theme prize, a Mars 5 Resin 3D Printer (Resin included)',
		img: '/images/prizes/mars5.png',
	},
	{
		place: '1st Place',
		prize: '+$150 on top of the theme prize, a Saturn 4 Resin 3D Printer (Resin included)',
		img: '/images/prizes/saturn4.png',
	},
	{
		place: '3rd Place',
		prize: '+$50 on top of the theme prize',
		img: null,
	},
];

const themePrizes = [
	{
		place: '1st Place',
		prize: '$100 cash',
	},
	{
		place: '2nd Place',
		prize: '$50 cash',
	},
	{
		place: '3rd Place',
		prize: '$25 cash',
	},
];

const neurotechPrizes = [
	{
		place: '2nd Place',
		prize: '1x Headband Kit',
		img: '/images/prizes/headband.png',
	},
	{
		place: '1st Place',
		prize: '1x Ganglion + Headband Kit',
		img: '/images/prizes/ganglionandheadband.png',
	},
	{
		place: '3rd Place',
		prize: 'EmotiBit',
		img: '/images/prizes/emotibit.avif',
	},
];

const Prizing = () => {
	return (
		<section id="prizing" className="w-full relative">
			<div className="max-w-7xl fc gap-10 w-full mx-auto z-10 px-5 sm:px-10 my-24 relative">
				<h3 className="text-4xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium">Grand Prizes</h3>
				<div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-10">
					{overallPrizes.map((prize, index) => (
						<motion.div
							key={index}
							// fade in scale first
							initial={{ opacity: 0, scale: 0 }}
							whileInView={{ opacity: 1, scale: index === 1 ? 1.1 : 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className={cn(
								'col-span-4 md:col-span-6 lg:col-span-4 row-span-4 bg-zinc-800 border-zinc-700 rounded-2xl border-2 relative overflow-hidden p-6',
								{
									'z-20': index === 1,
								}
							)}
						>
							<div className="fc items-start gap-3 w-full">
								<h3 className="text-3xl font-bold">{prize.place}</h3>
								<p>{prize.prize}</p>
							</div>
							{prize.img && <Image src={prize.img} alt={prize.place} className="w-full" width={500} height={500} />}
							{/* gradient */}
							<div className="absolute w-full -translate-y-[50%] aspect-square">
								{/* circle radial gradient */}
								{/* <div
									style={{
										backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)',
									}}
									className="absolute w-full h-full"
								></div> */}
							</div>
						</motion.div>
					))}
				</div>

				{/* theme prizes */}
				<h3 className="text-3xl lg:text-4xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium mt-16">Theme Prizes</h3>
				<div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-10">
					{themePrizes.map((prize, index) => (
						<div
							key={index}
							// fade in scale first
							className={cn(
								'col-span-4 md:col-span-6 lg:col-span-4 row-span-4 bg-zinc-800 border-zinc-700 rounded-2xl border-2 relative overflow-hidden',
								{
									'z-20': index === 1,
								}
							)}
						>
							<div className="fc items-start gap-3 w-full p-6">
								<h3 className="text-3xl font-bold">{prize.place}</h3>
								<p>{prize.prize}</p>
							</div>
							{/* gradient */}
							<div className="absolute w-full -translate-y-[50%] aspect-square">
								{/* circle radial gradient */}
								{/* <div
									style={{
										backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)',
									}}
									className="absolute w-full h-full"
								></div> */}
							</div>
						</div>
					))}
				</div>

				{/* neurotech prizes */}
				<h3 className="text-3xl lg:text-4xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium mt-16">
					Neurotech Prizes
				</h3>
				<div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-10">
					{neurotechPrizes.map((prize, index) => (
						<motion.div
							key={index}
							// fade in scale first
							initial={{ opacity: 0, scale: 0 }}
							whileInView={{ opacity: 1, scale: index === 1 ? 1.1 : 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className={cn(
								'col-span-4 md:col-span-6 lg:col-span-4 row-span-4 bg-zinc-800 border-zinc-700 rounded-2xl border-2 relative overflow-hidden',
								{
									'z-20': index === 1,
								}
							)}
						>
							<div className="fc items-start gap-3 w-full p-6">
								<h3 className="text-3xl font-bold">{prize.place}</h3>
								<p>{prize.prize}</p>
							</div>
							{prize.img && <Image src={prize.img} alt={prize.place} className="w-full" width={500} height={500} />}
							{/* gradient */}
							<div className="absolute w-full -translate-y-[50%] aspect-square">
								{/* circle radial gradient */}
								{/* <div
									style={{
										backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)',
									}}
									className="absolute w-full h-full"
								></div> */}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Prizing;
