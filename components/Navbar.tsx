import React from 'react';
import Image from 'next/image';
import { IoLogoInstagram } from 'react-icons/io5';
import { FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6';

const Navbar = () => {
	return (
		<div className="w-full bg-black/30 fixed top-0 backdrop-blur-xl py-3 px-4 md:px-10 fr justify-between z-50">
			{/* logo */}
			<Image src="/images/logo-horizontal.svg" height={50} width={150} alt="logo" className="hidden sm:block" />
			<Image src="/images/Logo.png" height={50} width={50} alt="logo" className="block sm:hidden" />

			<ul className="fr gap-2 nav-links text-white text-2xl">
				<li>
					<a href="https://www.instagram.com/hacks_49" target="_blank" rel="noopener noreferrer">
						<IoLogoInstagram />
					</a>
				</li>
				<li>
					<a href="https://x.com/hacks_49" target="_blank" rel="noopener noreferrer">
						<FaXTwitter />
					</a>
				</li>
				<li>
					<a href="https://www.tiktok.com/@hacks_49" target="_blank" rel="noopener noreferrer">
						<FaTiktok />
					</a>
				</li>
				<li>
					<a href="https://www.youtube.com/@hacks_49" target="_blank" rel="noopener noreferrer">
						<FaYoutube />
					</a>
				</li>
			</ul>
			{/* links */}
		</div>
	);
};

export default Navbar;
