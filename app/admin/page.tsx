import { getAllCategories, getAllFAQs, getWaitlist } from '@/utils/supabase/actions';
import Dashboard from './Dashboard';

const Home = async () => {
	const faqs = await getAllFAQs();
	const waitlist = await getWaitlist();
	const categories = await getAllCategories();

	return <Dashboard faqs={faqs} waitlist={waitlist} categories={categories} />;
};

export default Home;
