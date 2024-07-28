import { getAllCategories, getAllFAQs, getWaitlist } from '@/utils/supabase/actions';
import Dashboard from './Dashboard';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

const Home = async () => {
	const faqs = await getAllFAQs();
	const waitlist = await getWaitlist();
	const categories = await getAllCategories();
	const supabase = createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect('/login');
	}

	return <Dashboard faqs={faqs} waitlist={waitlist} categories={categories} />;
};

export default Home;
