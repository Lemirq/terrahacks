import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { logout } from '../login/actions';

export default async function PrivatePage() {
	const supabase = createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		// 2 seconds delay before redirecting to login
		redirect('/login');
	}

	return (
		<main className="w-full min-h-screen py-36 fc px-5 sm:px-10">
			<form>
				<button formAction={logout}>Logout</button>
			</form>
		</main>
	);
}
