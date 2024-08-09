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
const prizes = [
	{
		tickets: 5,
		prize: '1 entry on winning Hack49 t-shirt',
	},
	{
		tickets: 10,
		prize: '2 entries on winning Hack49 t-shirt',
	},
	{
		tickets: 20,
		prize: '3 entries on winning Hack49 t-shirt + custom stickers',
	},
	{
		tickets: 50,
		prize: '4 entries on winning Hack49 t-shirt + custom hat',
	},
	{
		tickets: 75,
		prize: '5 entries on winning Hack49 t-shirt + custom water bottle',
	},
	{
		tickets: '1 million',
		prize: 'Guaranteed Tesla with Hack49 logo',
	},
];
const Referral = ({ user, refCode }: { user: User; refCode: Tables<'referrals'>[] }) => {
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
	const createReferralCode = async () => {
		// create referral code
		const { error } = await supabase.from('referrals').insert({ user_id: user.id, code: referralCode });
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
		<section className="w-full rainbow-shadow relative mt-5">
			<AnimatePresence>{prizesVisible && <PrizeTiers setVisibility={setVisibility} />}</AnimatePresence>
			<div className="rounded-2xl border py-5 px-5 sm:px-10 border-neutral-300/30 w-full bg-neutral-900  relative z-10 fc items-start md:fr md:justify-between gap-10 justify-between">
				<div className="z-10 fc items-start">
					<h3 className="text-3xl font-bold">Referral Raffle and Prizes</h3>
					<p className="text-lg">Refer a friend to get a chance to win a prize!</p>
					<p>
						After creating a referral code, share it with your friends. When they <b>submit an application</b> using your code, you get a
						ticket.
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
					<Button className="mt-3" onClick={() => setPrizesVisible(true)} color="primary">
						View Prize Tiers
					</Button>
				</div>
				<div className="fc gap-2 z-10 w-full">
					<h3 className="text-2xl font-bold">{created ? 'Referral Tickets' : 'Create a referral code'}</h3>
					{!created && (
						<div className="fr gap-2 w-full">
							<Input placeholder="Create referral code..." value={referralCode} onChange={(e) => setReferralCode(e.target.value)} />
							<Button isDisabled={!referralCode} onClick={createReferralCode}>
								Create
							</Button>
						</div>
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
	);
};

export default Referral;
