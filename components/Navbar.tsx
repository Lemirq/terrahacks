'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useMotionValueEvent, useScroll, motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@/node_modules/@supabase/auth-js/src/lib/types';

const Navbar = ({ sUser }: { sUser: User }) => {
	const { scrollYProgress } = useScroll();
	const supabase = createClient();
	const [user, setUser] = useState(!!sUser);

	useEffect(() => {
		supabase.auth.onAuthStateChange((event, session) => {
			// console.log(event, session);
			if (event === 'SIGNED_IN') {
				setUser(true);
			} else if (event === 'SIGNED_OUT') {
				setUser(false);
			}
		});
		const fetchUser = async () => {
			const { data, error } = await supabase.auth.getUser();
			if (error) {
				console.log(error);
			} else if (data.user) {
				setUser(true);
			}
		};
		fetchUser();
	}, []);
	const [visible, setVisible] = useState(false);

	useMotionValueEvent(scrollYProgress, 'change', (current) => {
		// Check if current is not undefined and is a number
		if (typeof current === 'number') {
			let direction = current! - scrollYProgress.getPrevious()!;

			if (scrollYProgress.get() < 0.05) {
				setVisible(false);
			} else {
				if (direction < 0) {
					setVisible(true);
				} else {
					setVisible(false);
				}
			}
		}
	});

	return (
		<motion.nav
			// initial={{
			// 	opacity: 1,
			// 	y: -100,
			// }}
			// animate={{
			// 	y: visible ? 0 : -100,
			// 	opacity: visible ? 1 : 0,
			// }}
			// transition={{
			// 	duration: 0.2,
			// }}
			className="w-full bg-black/30 fixed top-0 backdrop-blur-xl py-3 px-4 md:px-10 fr justify-between z-50"
		>
			{/* logo */}
			<Link href="/">
				<Image src="/images/logo-horizontal.svg" height={50} width={150} alt="logo" className="hidden sm:block" />
				<Image src="/images/Logo.png" height={50} width={50} alt="logo" className="block sm:hidden" />
			</Link>
			{user ? (
				<Link href="/dashboard">
					<Button color="primary">Dashboard</Button>
				</Link>
			) : (
				<div className="fr gap-2">
					<Link href="/login">
						<Button variant="shadow" color="primary">
							Login
						</Button>
					</Link>
					<Link href="/signup">
						<Button variant="shadow" color="primary">
							Sign up
						</Button>
					</Link>
				</div>
			)}
			{/* <ul className="fr gap-2 nav-links text-white text-2xl">
				<li>
					<a href="https://www.instagram.com/hack49__/" target="_blank" rel="noopener noreferrer">
						<IoLogoInstagram />
					</a>
				</li>
				<li>
					<a href="https://x.com/hack49_" target="_blank" rel="noopener noreferrer">
						<FaXTwitter />
					</a>
				</li>
				<li>
					<a href="https://www.youtube.com/channel/UCHT4o_3qcYAMNw1Sgdq7FMQ" target="_blank" rel="noopener noreferrer">
						<FaYoutube />
					</a>
				</li>
			</ul> */}
			{/* links */}
		</motion.nav>
	);
};

export default Navbar;
