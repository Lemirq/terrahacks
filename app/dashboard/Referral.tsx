'use client';
import React, { useEffect, useState } from 'react';
import { User } from '@/node_modules/@supabase/auth-js/src/lib/types';
import { user } from '@nextui-org/theme';
import Link from 'next/link';
import { Button, Input } from '@nextui-org/react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { Database, Tables } from '@/database.types';

const Referral = ({ user, code }: { user: User; code: Tables<'referrals'>[] }) => {
	const [referralCode, setReferralCode] = useState<string>('');
	const [created, setCreated] = useState<boolean>(code.length > 0);
	const supabase = createClient();

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
	};

	useEffect(() => {
		const fetchUsedReferrals = async () => {
			const { data, error } = await supabase.from('referrals').select('code').eq('user_id', user.id);
			if (error) {
				console.error(error.message);
			}
			if (data) {
				setCreated(true);
			}
		};
	}, [created]);

	return (
		<section className="z-10 w-full rainbow-shadow py-5 px-5 sm:px-10 fc gap-5 items-start md:fr md:justify-between justify-between relative rounded-2xl border border-neutral-300/30 bg-neutral-900 mt-5">
			<div className="z-10">
				<h3 className="text-3xl font-bold">Referral Raffle</h3>
				<p className="text-lg">Refer a friend to get a chance to win a prize!</p>
				{created && (
					<p className="my-3">
						Your code: <span className="font-bold">{code[0].code}</span>
					</p>
				)}
				<ul></ul>
				<Button className="mt-3" onClick={() => createReferralCode()} color="primary">
					View Prize Tiers
				</Button>
			</div>
			<div className="fc gap-2 z-10">
				<h3 className="text-2xl font-bold">{created ? 'Referrals' : 'Create a referral code to share'}</h3>
				{!created && (
					<div className="fr gap-2 w-full">
						<Input placeholder="Create referral code..." value={referralCode} onChange={(e) => setReferralCode(e.target.value)} />
						<Button isDisabled={!referralCode} onClick={createReferralCode}>
							Create
						</Button>
					</div>
				)}
				{created && <div className="text-7xl font-bold tracking-tighter">4</div>}
			</div>
		</section>
	);
};

export default Referral;
