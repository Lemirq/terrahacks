'use client';
import React, { useState } from 'react';
import { User } from '@/node_modules/@supabase/auth-js/src/lib/types';
import Conf from '../Conf';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import { IoArrowBack, IoChevronForward } from 'react-icons/io5';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Database } from '@/database.types';
import { LuLoader } from 'react-icons/lu';

const Success = ({ user, referralCode }: { user: User; referralCode: Database['public']['Tables']['referrals']['Row'] }) => {
	const [referral, setReferral] = useState(false);
	const [code, setcode] = useState('');
	const [imageLoaded, setImageLoaded] = useState(false);

	const supabase = createClient();

	const applyReferral = async () => {
		// check if referred_by is already set
		const { data: userCheckData, error: userCheckErr } = await supabase.from('users').select('referred_by').eq('uid', user.id).single();
		if (userCheckErr) {
			console.error(userCheckErr.message);
			return;
		}

		if (userCheckData.referred_by) {
			toast.error('You have already applied a referral code');
			return;
		}

		// verify that the referral code exists
		const { data: refData, error: refError } = await supabase.from('referrals').select('used').eq('code', code).single();
		if (refError) {
			if (refError.code === 'PGRST116') {
				toast.error('Referral code does not exist');
				return;
			}
			console.log(refError);
			return;
		}

		// update users table
		const { data: userData, error: userError } = await supabase.from('users').update({ referred_by: code }).eq('uid', user.id);

		if (userError) {
			console.error(userError.message);
			return;
		}

		const newUsed = (refData.used += 1);

		// apply referral code
		const { error } = await supabase.from('referrals').update({ used: newUsed }).eq('code', code);
		if (error) {
			console.error(error.message);
			return;
		} else {
			toast.success('Referral code applied successfully');
			setReferral(true);
		}
	};

	return (
		<AnimatePresence>
			{!referral && (
				<motion.div
					initial={{
						opacity: 0,
						y: 50,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					transition={{
						duration: 0.5,
					}}
					className="w-full min-h-screen overflow-hidden relative py-36 fc"
				>
					<div className="w-full max-w-2xl mx-auto px-4">
						<h1 className="text-4xl font-bold">Would you like to use a referral code?</h1>
						<p className="my-4">If your friend has given you a referral code, you can apply it here.</p>
						<p>
							You can win some amazing prizes by referring your friends to Hack49. The more friends you refer, the more tickets you get.
							To view the prizes, go to Dashboard <IoChevronForward className="mx-1 inline-block" /> Referral Prizes.
						</p>
						<div className="fr gap-2 mt-4">
							<Input placeholder="Referral Code" value={code} onChange={(e) => setcode(e.target.value)} />
							<Button isDisabled={!code} color="primary" onClick={applyReferral}>
								Apply
							</Button>
						</div>

						<div className="w-full fr mt-3">
							<button className=" text-blue-500" onClick={() => setReferral(true)}>
								Skip
							</button>
						</div>
					</div>
				</motion.div>
			)}
			{referral && (
				<motion.div
					initial={{
						opacity: 0,
						y: 50,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					transition={{
						duration: 0.5,
					}}
					className="w-full min-h-screen overflow-hidden relative py-36 fc"
				>
					<Conf />
					<div className="w-full max-w-xl mx-auto px-4">
						<h1 className="text-4xl font-bold">Your Application is Submitted, {user.user_metadata.first_name}!</h1>
						<p className="my-4">Thank you for applying to Hack49. We will review your application and get back to you soon.</p>

						<h2 className="text-2xl font-bold">Next Steps:</h2>
						<ul className="list-disc pl-6 my-4">
							<li>Check your email for further instructions.</li>
							<li>Post on linkedin!</li>
						</ul>

						<h2 className="text-2xl font-bold">Example Post:</h2>
						<p>
							We want to see your excitement! Post on LinkedIn and tag us @hack49. We will feature the best posts on our social media.
						</p>
						<p>
							If you haven't already created a referral code, you can do so by going to the Dashboard{' '}
							<IoChevronForward className="mx-1 inline-block" /> Referral Prizes.
						</p>
						<p className="mt-4">Here's a sample post:</p>
						<div className="text-lg bg-neutral-800 p-4 rounded-lg my-3">
							Excited to be a part of Hack49! Can't wait to meet the best minds in tech! 🚀
							<br />
							Hack49 is a 3-day virtual global hackathon where you can showcase your skills and win amazing prizes!
							<br />
							You can use my referral code when you apply to help me win some cool prizes! 🎁 My referral code: {referralCode.code}
							<br />
							#Hack49 #Hackathon #Tech #Innovation
						</div>

						<p>
							The following image can accompany your post. This image may or may not have your unique referral code. If it doesn't, we
							suggest you make one on the Dashboard, then visit /apply/success again to get the updated image.
						</p>
						{!imageLoaded && (
							<p className="">
								<LuLoader className="mr-2" /> Loading image...
							</p>
						)}
						<Image
							className="my-4 w-full"
							src={
								referralCode && referralCode.code
									? `/api/generate_img?code=${referralCode.code}&mode=applied`
									: '/api/generate_img?mode=applied'
							}
							width={500}
							height={500}
							alt="Linkedin post"
							onLoad={() => setImageLoaded(true)}
						/>
						<Link href="/dashboard">
							<Button color="primary" startContent={<IoArrowBack />}>
								Back to Dashboard
							</Button>
						</Link>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Success;
