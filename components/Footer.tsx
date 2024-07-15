import React from 'react';
import Image from 'next/image';
import { FaXTwitter, FaTiktok, FaYoutube } from 'react-icons/fa6';
import { IoLogoInstagram } from 'react-icons/io5';
const Footer = () => {
	return (
		<footer className="rounded-lg shadow bg-neutral-900 m-4">
			<div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
				<div className="sm:flex sm:items-center sm:justify-between">
					<a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
						<Image src="/images/logo-horizontal.svg" className="h-10" alt="Hack49 Logo" width={100} height={100} />
					</a>
					<ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-gray-400">
						<li>
							<a href="#hero" className="hover:underline me-4 md:me-6">
								Waitlist
							</a>
						</li>
						<li>
							<a href="#about" className="hover:underline me-4 md:me-6">
								About
							</a>
						</li>
						<li>
							<a href="#founders" className="hover:underline me-4 md:me-6">
								Founders
							</a>
						</li>
						<li>
							<a href="mailto:hackfortynine@gmail.com" className="hover:underline">
								Contact
							</a>
						</li>
					</ul>
				</div>
				<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
				<div className="sm:flex sm:items-center sm:justify-between fc sm:fr gap-3">
					<span className="text-sm text-gray-500 text-center dark:text-gray-400">
						© {new Date().getFullYear()}{' '}
						<a href="https://hack-49.vercel.app/" className="hover:underline">
							Hack49 Global™
						</a>
						. All Rights Reserved.
					</span>
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
				</div>
			</div>
		</footer>
	);
};

export default Footer;
