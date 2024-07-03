import React from 'react';
import Image from 'next/image';

const Navbar = () => {
	return (
		<div className="w-full bg-black/30 fixed top-0 backdrop-blur-xl py-3 px-10 fr justify-between z-50">
			{/* logo */}
			<div className="flex items-center gap-2">
				<Image src="/images/logo-horizontal.svg" height={50} width={150} alt="logo" />
			</div>
			{/* links */}
		</div>
	);
};

export default Navbar;
