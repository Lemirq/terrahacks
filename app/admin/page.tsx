import { getAllCategories, getAllFAQs, getWaitlist } from '@/utils/supabase/actions';
import Dashboard from './Dashboard';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

const Home = async () => {
	const waitlist = await getWaitlist();
	const supabase = createClient();

	const { data, error } = await supabase.auth.getUser();

	if (error || !data) {
		redirect('/login');
		return null;
	}

	return <Dashboard user={data.user} waitlist={waitlist} />;
};
export const fetchCache = 'force-no-store';

export default Home;
