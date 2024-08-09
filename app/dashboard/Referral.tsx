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
			<div className="rounded-2xl border py-5 px-5 sm:px-10 border-neutral-300/30 w-full bg-neutral-900  relative z-10 fc gap-5 items-start md:fr md:justify-between justify-between">
				<div className="z-10">
					<h3 className="text-3xl font-bold">Referral Raffle</h3>
					<p className="text-lg">Refer a friend to get a chance to win a prize!</p>
					{created && code.length > 0 && (
						<p className="my-3">
							Your code: <span className="font-bold">{code[0].code}</span>
						</p>
					)}
					<Button className="mt-3" onClick={() => setPrizesVisible(true)} color="primary">
						View Prize Tiers
					</Button>
				</div>
				<div className="fc gap-2 z-10">
					<h3 className="text-2xl font-bold">{created ? 'Referral Tickets' : 'Create a referral code to share'}</h3>
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
