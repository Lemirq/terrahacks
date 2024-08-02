import React from 'react';
import Faqs from './FAQ';
import { getAllCategories, getAllFAQs } from '@/utils/supabase/actions';

const FAQ = async () => {
	const faqs = await getAllFAQs();
	const categories = await getAllCategories();

	return <Faqs categories={categories} initialFAQs={faqs} />;
};

export default FAQ;
