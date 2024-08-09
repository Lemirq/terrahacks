'use client';
import React from 'react';
import { people } from '@/data/people';
import { motion } from 'framer-motion';
import { Button } from '@nextui-org/react';
import { IoLogoLinkedin } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperControls from '@/components/SwiperControls';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// const container = {
// 	hidden: { opacity: 0 },
// 	show: {
// 		opacity: 1,
// 		transition: {
// 			staggerChildren: 0.2,
// 		},
// 	},
// };

// const listItem = {
// 	hidden: { opacity: 0 },
// 	show: { opacity: 1 },
// };
const MeetTheTeam = () => {
	return (
		<section id="founders" className="w-full px-5 sm:px-10 fc gap-10 mx-auto my-24">
			<motion.h3
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium"
			>
				Meet The Team
			</motion.h3>
			{/* <div
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
			>
				{people.map((person, index) => (
					<Founder key={index} {...person} />
				))}
			</div> */}
			<Swiper
				centeredSlides={true}
				autoplay={{
					delay: 1500,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
					dynamicBullets: false,
					bulletElement: 'button',
					bulletActiveClass: '!bg-white',
					bulletClass: 'bg-neutral-400 w-8 h-1 rounded-full mr-2',
				}}
				navigation={false}
				modules={[Autoplay, Pagination, Navigation]}
				className="w-full fc mySwiper !overflow-x-hidden !overflow-y-visible"
				slidesPerView={1}
				spaceBetween={10}
				breakpoints={{
					640: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 40,
					},
					1024: {
						slidesPerView: 5,
						spaceBetween: 50,
					},
					1280: {
						slidesPerView: 7,
						spaceBetween: 60,
					},
				}}
			>
				{people.map((person, index) => (
					<SwiperSlide key={index}>
						<Founder {...person} />
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

interface FounderProps {
	name: string;
	title: string;
	description: string;
	image: string;
	lk: string;
}

const Founder = ({ name, title, description, image, lk }: FounderProps) => {
	return (
		<div className="fc py-10 gap-2 h-full w-full justify-start">
			<div className="w-40 h-40 rounded-full overflow-hidden">
				<img src={image} alt={name} className="w-full h-full object-cover" />
			</div>
			<h4 className="text-2xl font-semibold text-white inline-flex justify-center items-center gap-2">
				{/* dont wrap text */}
				<span className="whitespace-nowrap">{name}</span>
				{lk && (
					<a href={lk} target="_blank" rel="noreferrer">
						<Button isIconOnly variant="bordered">
							<IoLogoLinkedin />
						</Button>
					</a>
				)}
			</h4>
			{/* <div className="fr gap-3 mb-4"></div> */}

			{/* <p className="text-lg text-gray-400">{title}</p> */}
			{/* <p className="text-lg sm:text-sm text-gray-200 	text-center max-w-[30ch]">{description}</p> */}
		</div>
	);
};

export default MeetTheTeam;
