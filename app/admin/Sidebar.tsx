'use client';
import { cn } from '@/utils/cn';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { logout } from '../login/actions';
import { IoLogOut } from 'react-icons/io5';
import { headers } from 'next/headers';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
	// const headersList = headers();
	// const domain = headersList.get('host') || '';
	// const fullUrl = headersList.get('referer') || '';
	// console.log(domain);
	// console.log(fullUrl);
	// // new url object with fullURl
	// const url = new URL(fullUrl);
	const pathname = usePathname();
	// get the pathname
	// const pathname = url.pathname;
	const links = [
		{
			href: '/admin',
			text: 'Home',
		},
		{
			href: '/admin/faq',
			text: 'FAQ',
		},
		{
			href: '/admin/applications',
			text: 'Applications',
		},
	];

	return (
		<div className="h-screen fixed left-0 fc px-10 pt-24 pb-10 select-none">
			<div className="w-56 h-screen rounded-2xl bg-neutral-900 border-2 border-neutral-300/20 justify-between fc gap-4 py-10 px-5">
				{/* Links for FAQ, waitlist, applications */}
				<div className="fc w-full gap-2">
					{links.map((link) => (
						<Link
							className={cn('w-full bg-neutral-800 rounded-xl px-5 py-2 border border-neutral-300/20', {
								'bg-primary-300/60': pathname === link.href,
							})}
							key={link.href}
							href={link.href}
						>
							{link.text}
						</Link>
					))}
				</div>
				<form className="w-full">
					<Button
						fullWidth
						type="submit"
						formAction={logout}
						color="danger"
						variant="ghost"
						startContent={<IoLogOut className="rotate-180" />}
					>
						Logout
					</Button>
				</form>
			</div>
		</div>
	);
};

export default Sidebar;
