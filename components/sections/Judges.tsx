import Image from 'next/image';
import React from 'react';
import { FaUser } from 'react-icons/fa6';

interface Judge {
	name: string;
	title: string;
	company: string;
	image?: string;
}

// Sri Bhargav Krishna Adusumilli <sribhargav.adusumilli@ieee.org>,

const judges: Judge[] = [
	{
		name: 'Anav Gagneja',
		company: 'Spotify',
		title: 'Backend Engineer',
		image: 'https://media.licdn.com/dms/image/v2/D4E03AQEMY08JvFnMag/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1692884542961?e=1734566400&v=beta&t=qb3pYcUN8Oq8aPOOQXBQ2uYdE8Npk1W8vsz7wtJkK-s',
	},
	{
		name: 'Sai Chiligireddy',
		company: 'Amazon',
		title: 'Engineering Leader',
		image: '/images/judges/sai.png',
	},
	{
		name: 'Sankalp Shrivastava',
		company: 'Parivestra.com',
		title: 'Head of Product & Growth',
		image: '/images/judges/Sankalp.jpeg',
	},
	{
		name: 'Tejas Ghadge',
		company: 'AWS Lambda',
		title: 'Head of Eventing and Developer Experience Organization',
		image: '/images/judges/tejas.jpg',
	},
	{
		name: 'Gokul Naidu',
		company: 'Amazon',
		title: 'Software Development Manager',
		image: '/images/judges/gokul.png',
	},
	{
		name: 'Madhu Chavva',
		company: 'Growthbook',
		title: 'VP of SDK Engineering',
		image: '/images/judges/madhu.jpg',
	},
	{
		name: 'Ajinkya Ghadge',
		company: 'Expedia Group',
		title: 'Software Engineering Lead',
		image: 'https://media.licdn.com/dms/image/v2/C5603AQEgEuJpGlcHLQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1541750129259?e=1734566400&v=beta&t=3gxYhkCJOhqKNKn3DAq0aO4OIpyGI01cj6eH_3v-edE',
	},
	{
		name: 'Josh Roy',
		title: 'Founder',
		company: 'Monkey Apps',
		image: 'https://media.licdn.com/dms/image/v2/D4E03AQE8K-0zSYVUHA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1693567626948?e=1734566400&v=beta&t=FndjgylLyfbqKTcrtpDsuzSAKxizu0NEg0M-y7-1jSM',
	},

	{
		name: 'Sriram Santosh Aripirala',
		company: 'Android Tech Lead',
		title: 'Airbnb',
		image: 'https://media.licdn.com/dms/image/v2/C5603AQELxcA-QUQpPA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1644040572865?e=1734566400&v=beta&t=eaKCSzJmNMt-M_XuDaqzvU6A93OcADQFyGethvq-8z0',
	},
	{
		name: 'Pranay Airan',
		company: 'Android Tech Lead',
		title: 'Airbnb',
		image: '/images/judges/pranay.jpg',
	},
	{
		name: 'Sri Bhargav Krishna Adusumilli',
		company: 'Mindquest Technology Solutions',
		title: 'Co-Founder',
		image: 'https://media.licdn.com/dms/image/v2/C4D03AQFWD3bOjVEXIA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1575414752576?e=1734566400&v=beta&t=FuqJSFzifhVcAOYCADLNk5d-SnL29mV13Ouow80JuRU',
	},
	{
		name: 'Surya Maddula',
		title: 'Student',
		company: 'The Knowledge Society',
		image: 'https://media.licdn.com/dms/image/v2/D4E03AQEazrhumUQe3w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1712813700880?e=1734566400&v=beta&t=DR46FV5VzdppLhiFuzH5Mr4fgEw6JJnLfO1dcQ-7p34',
	},
	{
		name: 'Araf A Alam',
		title: 'Prev. Software Engineer',
		company: 'TD',
		image: 'https://media.licdn.com/dms/image/v2/D4D03AQFkxEHQHK0WoA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1689302529649?e=1734566400&v=beta&t=zdeomOjf4p4rIEr0_g5GZm9mwrEwgg8izHmi0Y4jX7w',
	},
	{
		name: 'Dr. Rakesh Kantaria',
		title: 'Professor',
		company: 'Seneca College',
		image: 'https://media.licdn.com/dms/image/v2/D5603AQHZimuwEksyrQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724510347724?e=1734566400&v=beta&t=nun852LMvHZ_Gd3Vrvj4D3kII7h4NQftjLShLD2_jnY',
	},
	{
		name: 'Arjun Kumar',
		title: 'Prompt Engineer',
		company: 'DBS Bank',
		image: 'https://media.licdn.com/dms/image/v2/D5603AQEmLr4l-3ni2g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722102136513?e=1734566400&v=beta&t=WqEWf11JH3L-7CcV4x3dAvR3ciM2DaiOVwt43mJOKk4',
	},
	{
		name: 'Aidan Ouckama',
		title: 'SWE Intern',
		company: 'DataDog & DoorDash',
		image: 'https://media.licdn.com/dms/image/v2/D4E03AQEmTjOtlP-bow/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722921060406?e=1734566400&v=beta&t=aASCQjlL9Oow6cWzTMHn4dwrh-QzqfVh-hflK8-OYKs',
	},
	{
		name: 'Fatimah Hussain',
		title: 'Founder',
		company: 'Workout Wizard',
		image: 'https://media.licdn.com/dms/image/v2/D5603AQHTG-KYqZR3Pg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1668287437533?e=1734566400&v=beta&t=U4DvNtiW2GMquJbobH8jZRLc1ZdRpn3K91KhO_O94A8',
	},
	{
		name: 'Navya',
		title: 'Software Engineer',
		company: 'Dell',
	},
];

const Judges = () => {
	return (
		<section className="px-5 sm:px-10 py-12 w-full my-12">
			<h3 className="text-4xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium mb-10">Our Judges</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
				{judges.map((judge: Judge) => (
					<div className="fr gap-4 w-full justify-start" key={judge.name}>
						{judge.image ? (
							<div className="size-32 aspect-square rounded-md fc overflow-hidden">
								<Image src={judge.image} alt={judge.name} className="object-cover size-full" width={128} height={128} />
							</div>
						) : (
							<div className="w-32 h-32 rounded-md fc text-4xl text-neutral-700 bg-neutral-800">
								<FaUser />
							</div>
						)}
						<div className="fc gap-1 items-start w-full">
							<h2 className="text-xl md:text-2xl font-bold">{judge.name}</h2>
							<h3 className="text-lg md:text-xl font-semibold">{judge.title}</h3>
							<p className="text-base md:text-lg italic">{judge.company}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Judges;
