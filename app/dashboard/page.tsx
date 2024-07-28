import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { logout } from '../login/actions';

export default async function PrivatePage() {
	const supabase = createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect('/login');
	}

	return (
		<main className="w-full min-h-screen fc">
			<p className="pt-36">Hello {data.user.email}</p>
			<form>
				<button formAction={logout}>Logout</button>
			</form>
		</main>
	);
}
