'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
type InstagramPost = {
	id: string;
	caption: string;
	media_url: string;
	media_type: string;
	timestamp: string;
	permalink: string;
};

type InstagramPaging = {
	cursors: {
		before: string;
		after: string;
	};
};

type InstagramFeed = {
	data: InstagramPost[];
	paging?: InstagramPaging;
};

export default function InstaFeed() {
	const [instagramFeed, setInstagramFeed] = useState<InstagramFeed | null>(null);
	const [after, setAfter] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const fetchFeed = async (after: string | null = null) => {
		try {
			let url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp,permalink&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN}`;
			if (after) {
				url += `&after=${after}`;
			}
			const data = await fetch(url);

			if (!data.ok) {
				throw new Error('Failed to fetch Instagram feed');
			}

			const feed = await data.json();
			// console.log(feed);

			setInstagramFeed(feed);

			setAfter(feed.paging?.cursors.after);
		} catch (err: any) {
			console.error('Error fetching Instagram feed:', err.message);
			setError(err.message);
		}
	};

	const loadMore = () => {
		fetchFeed(after);
	};

	// Fetch the initial feed
	useEffect(() => {
		fetchFeed();
	}, []);

	return (
		<section className="py-12 w-full my-36">
			<Link href="https://www.instagram.com/hack49__/">
				<motion.h3
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-3xl lg:text-5xl lg:leading-tight text-center tracking-tight font-medium mb-5 inline-flex gap-2 justify-center items-center w-full"
				>
					<FaInstagram /> Instagram
				</motion.h3>
			</Link>
			{error && <p className="text-red-500">{error}</p>}

			{instagramFeed && (
				<InfiniteSlider duration={60} durationOnHover={100} gap={24}>
					{instagramFeed.data.map((post: InstagramPost) => (
						<div key={post.id} className="relative group w-full h-[300px] aspect-square">
							<Link href={post.permalink} target="_blank" rel="noopener noreferrer" className="relative">
								{post.media_type === 'VIDEO' ? (
									<video src={post.media_url} controls={false} className="w-full h-full aspect-square object-cover" />
								) : (
									<Image
										src={post.media_url}
										alt={post.caption ?? ''}
										className="w-full h-full aspect-square object-cover rounded-2xl"
										width={300}
										height={300}
									/>
								)}

								<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-black bg-opacity-50 flex items-center justify-center p-4 w-full h-[300px]">
									<p className="text-white text-center text-xs">{post.caption}</p>
								</div>
							</Link>
						</div>
					))}
				</InfiniteSlider>
			)}
		</section>
	);
}

import { InfiniteSlider } from '@/components/InfiniteSlider';
import { FaInstagram } from 'react-icons/fa6';

export function InfiniteSliderHoverSpeed() {
	return (
		<InfiniteSlider durationOnHover={75} gap={24}>
			<img
				src="https://i.scdn.co/image/ab67616d00001e02ad24c5e36ddcd1957ad35677"
				alt="Dean blunt - Black Metal 2"
				className="aspect-square w-[120px] rounded-[4px]"
			/>
			<img
				src="https://i.scdn.co/image/ab67616d00001e02af73f776b92d4614152fb141"
				alt="Jungle Jack - JUNGLE DES ILLUSIONS VOL 2"
				className="aspect-square w-[120px] rounded-[4px]"
			/>
			<img
				src="https://i.scdn.co/image/ab67616d00001e02ecdb8f824367a53468100faf"
				alt="Yung Lean - Stardust"
				className="aspect-square w-[120px] rounded-[4px]"
			/>
			<img
				src="https://i.scdn.co/image/ab67616d00001e021624590458126fc8b8c64c2f"
				alt="Lana Del Rey - Ultraviolence"
				className="aspect-square w-[120px] rounded-[4px]"
			/>
			<img
				src="https://i.scdn.co/image/ab67616d00001e020dcf0f3680cff56fe5ff2288"
				alt="A$AP Rocky - Tailor Swif"
				className="aspect-square w-[120px] rounded-[4px]"
			/>
			<img
				src="https://i.scdn.co/image/ab67616d00001e02bc1028b7e9cd2b17c770a520"
				alt="Midnight Miami (feat Konvy) - Nino Paid, Konvy"
				className="aspect-square w-[120px] rounded-[4px]"
			/>
		</InfiniteSlider>
	);
}
