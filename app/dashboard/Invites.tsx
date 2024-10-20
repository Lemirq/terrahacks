'use client';
import { Tables } from '@/database.types';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Invites = () => {
	const [link, setLink] = useState(null);
	const [inviteExists, setInviteExists] = useState(false);
	const copyLink = () => {
		navigator.clipboard.writeText('https://hack49.com/redeem_invite/' + link);
		toast.success('Link Copied to Clipboard');
	};
	const [users, setUsers] = useState<Tables<'users'>[] | null>([]);
	const supabase = createClient();
	const getInvites = async () => {
		const {
			data: { user },
			error: uError,
		} = await supabase.auth.getUser();
		if (!user) {
			toast.error('You need to be logged in to view invites');
			return;
		}

		const { data, error } = await supabase.from('invites').select('*').eq('invited_by', user.id);
		if (error) {
			toast.error('An error occured while fetching invites');
			return;
		}
		console.log(data);
		if (data.length === 0) {
			setInviteExists(false);
			return;
		}

		// fetch user
		const fetchUser = async (id: string) => {
			const { data, error } = await supabase.from('users').select('*').eq('uid', id);
			if (error) {
				console.log(error);
				toast.error('An error occured while fetching user');
				return;
			}
			return data[0];
		};

		if (!data[0]) {
			setUsers(null);
			setInviteExists(false);
			return;
		}

		setLink(data[0].code);
		const u = [];
		if (data[0].invited_who && data[0].invited_who.length > 0) {
			for (const guy of data[0].invited_who) {
				const user = await fetchUser(guy);
				u.push(user);
			}
			setUsers(u.length === 0 ? null : u);
		} else {
			setUsers(null);
		}
		setInviteExists(true);
	};

	useEffect(() => {
		getInvites();
	}, []);

	if (!inviteExists) return null;

	return (
		<section className="w-full py-5 px-5 sm:px-10 fc gap-5 items-start justify-between rounded-2xl border border-neutral-300/30 bg-neutral-900 mt-5">
			<div className="fc items-start gap-2">
				<h2 className="text-lg font-bold">Invites</h2>
				<p>Invite upto 2 people to join the hackathon. They will be instantly accepted, and you will gain a referral ticket.</p>
				<Button isDisabled={!link} color="primary" className="px-4" onClick={copyLink}>
					Copy Invite Link
				</Button>
				{!users && <p className="text-lg">You have not invited anyone yet</p>}
			</div>
			{/* map over users, show names */}
			<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
				{users &&
					users.length > 0 &&
					users.map((user: Tables<'users'>) => (
						<div key={user.uid} className="w-full p-5 bg-neutral-800 rounded-2xl border border-neutral-300/30">
							<h3 className="text-lg font-bold">{user.firstName + ' ' + user.lastName}</h3>
							<p className="text-sm">{user.email}</p>
						</div>
					))}
			</div>
		</section>
	);
};

export default Invites;
