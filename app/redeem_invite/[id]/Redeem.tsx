'use client';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
import React from 'react';
import { toast } from 'sonner';

const Redeem = ({ app, user }: { app: any; user: any }) => {
	const supabase = createClient();
	const router = useRouter();
	const acceptInvite = async () => {
		console.log('accepting invite');
		// check if user is already in team, or if team is full
		const { data: team, error: teamError } = await supabase.from('invites').select('*').eq('invited_by', app.user_id).single();
		console.log(team);
		if (teamError || !team) {
			toast.error('Error accepting invite');
			return;
		}

		if (team.invited_who && team.invited_who?.length >= 2) {
			// if cyrrent yser exists in the team
			if (team.invited_who.includes(user.id)) {
				toast.error('You are already in the team');
				router.push('/dashboard');
				return;
			}
			toast.error('Team is full');
			return;
		} else {
			// add user to team
			const already = team.invited_who ? [...team.invited_who] : [];
			const { data: update, error: updateError } = await supabase
				.from('invites')
				.update({ invited_who: [...already, user.id] })
				.eq('invited_by', app.user_id)
				.select('*');
			console.log(update);

			const updateReferral = async () => {
				// fetch amount of referrals
				const { data: referrals, error: referralsError } = await supabase.from('referrals').select('*').eq('user_id', user.id);

				if (referralsError) {
					toast.error('Error accepting invite');
					return;
				}

				if (referrals.length > 0) {
					// add a referral ticket
					const { data: ref, error: refError } = await supabase
						.from('referrals')
						.update({
							used: referrals[0].used + 1,
						})
						.eq('user_id', user.id);
					console.log(ref);
				} else {
					// create a referral ticket
					const { data: ref, error: refError } = await supabase.from('referrals').insert({
						user_id: user.id,
						code: user.id,
						used: 1,
					});
					console.log(ref);
				}
			};
			updateReferral();
			if (updateError) {
				toast.error('Error accepting invite');
			}

			toast.success('Invite accepted');
			// make a dummy application and accept them
			const { data: appData, error: appError } = await supabase.from('applications').upsert([
				{
					user_id: user.id,
					status: 'accepted',
					complete: true,
					email: user.email,
					first_name: user.user_metadata.first_name,
					last_name: user.user_metadata.last_name,
				},
			]);

			// redirect to dashboard
			router.push('/dashboard');
		}
	};
	return (
		<Button onClick={acceptInvite} type="submit" color="primary">
			Accept Invite
		</Button>
	);
};

export default Redeem;
