'use client';
import React, { useEffect, useState } from 'react';
import { User } from '@/node_modules/@supabase/auth-js/src/lib/types';
import { Button, Input } from '@nextui-org/react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { Tables } from '@/database.types';
import { IoTicket } from 'react-icons/io5';
import PrizeTiers from './PrizeTiers';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Referral = ({ user, refCode, app }: { user: User; app: Tables<'applications'>; refCode: Tables<'referrals'>[] }) => {
	const [referralCode, setReferralCode] = useState<string>('');
	const [created, setCreated] = useState<boolean>(refCode.length > 0);
	const [code, setCode] = useState<Tables<'referrals'>[]>(refCode);

	const [prizesVisible, setPrizesVisible] = useState(false);

	const supabase = createClient();
	const fetchUsedReferrals = async () => {
		const { data, error } = await supabase.from('referrals').select('*').eq('user_id', user.id);
		if (error) {
			console.error(error.message);
		}
		if (data) {
			setCode(data);
			setCreated(true);
		}
	};
	const createReferralCode = async (e: React.FormEvent) => {
		e.preventDefault();
		if (referralCode.length < 3) {
			toast.error('Referral code must be at least 3 characters long');
			return;
		}

		// create referral code
		const { error } = await supabase.from('referrals').insert({ user_id: user.id, code: referralCode.toLowerCase() });
		if (error) {
			if (error.code === '23505') {
				toast.error('Referral code already exists, pick a different one');
				return;
			}
		}

		setCreated(true);
		toast.success('Referral code created successfully');
		fetchUsedReferrals();
	};

	useEffect(() => {
		console.log('refCode', code);
	}, [code]);

	// useEffect(() => {
	// 	fetchUsedReferrals();
	// }, []);

	const setVisibility = (value: boolean) => {
		setPrizesVisible(value);
	};

	return (
		<>
			<section className="w-full rainbow-shadow relative mt-5">
				<AnimatePresence>{prizesVisible && <PrizeTiers setVisibility={setVisibility} />}</AnimatePresence>
				<div className="rounded-2xl border py-5 px-5 sm:px-10 border-neutral-300/30 w-full bg-neutral-900  relative z-10 fc items-start md:fr md:justify-between gap-10 justify-between">
					<div className="z-10 fc items-start">
						<h3 className="text-3xl font-bold">Referral Raffle</h3>
						<p className="text-lg">Refer a friend to get a chance to win a Hack49 t-shirt!</p>
						<p>
							After creating a referral code, share it with your friends. When they <b>submit an application</b> using your code, you
							get a ticket for the raffle.
						</p>

						{created && code.length > 0 && (
							<button
								className="my-3"
								onClick={() => {
									navigator.clipboard.writeText(code[0].code);
									toast.success('Code copied to clipboard');
								}}
							>
								Your code: <span className="font-bold">{code[0].code}</span>
							</button>
						)}
						<div className="fc gap-2 mt-4 items-start">
							<Button onClick={() => setPrizesVisible(true)} color="primary">
								View Prize
							</Button>
							{app && app.complete && app.status !== 'accepted' && (
								<Link
									href={code && code[0] ? `/api/generate_img?code=${code[0].code}&mode=applied` : '/api/generate_img?mode=applied'}
									target="_blank"
									download="applied.png"
								>
									<Button color="primary">Generate Post Image</Button>
								</Link>
							)}
							{app && app.complete && app.status !== 'accepted' && (
								<p>
									{code && code[0]
										? "This is the 'Just Applied' image that can accompany any social media posts. It contains your referral code."
										: "This is the 'Just Applied' image that can accompany any social media posts. It doesn't contain your unique referral code. If you would like it to, create one below, and refresh."}
								</p>
							)}
						</div>
					</div>
					<div className="fc gap-2 z-10 w-full">
						<h3 className="text-2xl font-bold">{created ? 'Referral Tickets' : 'Create a referral code'}</h3>
						{!created && (
							<form className="fc sm:fr gap-2 w-full" onSubmit={createReferralCode}>
								<Input
									maxLength={15}
									placeholder="Create referral code..."
									value={referralCode}
									onChange={(e) => setReferralCode(e.target.value)}
								/>
								<Button className="w-full sm:w-auto" isDisabled={!referralCode} type="submit">
									Create
								</Button>
							</form>
						)}
						{created && code[0] && (
							<div className="text-7xl font-bold tracking-tighter fr">
								<IoTicket className="mr-2 text-4xl" />
								{code[0].used}
							</div>
						)}
					</div>
				</div>
			</section>
			{app.status === 'accepted' && (
				<div className="rounded-2xl border py-5 px-5 sm:px-10 border-neutral-300/30 w-full bg-neutral-900  relative z-10 fc items-stretch md:fr md:justify-between gap-10 justify-between">
					<div className="z-10 fc gap-2 items-start justify-start">
						<h3 className="text-3xl font-bold">Post</h3>
						<p>We want to celebrate your acceptance to Hack49! Share the news and spread the word about the event. Below is a sample:</p>
						<div className="text-lg bg-neutral-800 p-4 rounded-lg">
							<p>I GOT ACCEPTED to participate in Hack49! 🚀</p>
							<p>Hack49 is a 3-day virtual global hackathon where you can showcase your skills and win amazing prizes!</p>
							{code && (
								<>
									<p>
										You can use my referral code when you apply to help me win a free Hack49 t-shirt! 🎁 My referral code:{' '}
										{code[0].code}
									</p>
								</>
							)}
							<p>#Hack49 #Hackathon #Tech #Innovation</p>
						</div>
					</div>
					<div className="fc gap-1 w-full">
						<a
							className="w-full"
							download={`Hack49-Social-Post-${user.user_metadata.first_name}.png`}
							href={
								code[0] && code[0].code ? `/api/generate_img?code=${code[0].code}&mode=accepted` : '/api/generate_img?mode=accepted'
							}
						>
							<Image
								src={code ? `/api/generate_img?mode=accepted&code=${code[0].code}` : `/api/generate_img?mode=accepted`}
								alt="image"
								className="m-auto rounded-md w-full"
								width={500}
								height={500}
							/>
						</a>
						<p>Click image to download</p>
					</div>
				</div>
			)}
		</>
	);
};

export default Referral;
