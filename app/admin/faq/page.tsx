import React from 'react';
import Faqs from './FAQ';
import { getAllCategories, getAllFAQs } from '@/utils/supabase/actions';

const FAQ = async () => {
	const faqs = await getAllFAQs();
	const categories = await getAllCategories();
	console.log(categories);
	console.log(faqs);
	// match categories to faqs, id key in faqs is name key in categories
	const newFaqs = faqs.map((faq) => {
		const category = categories.find((category) => category.id === faq.category);
		return { ...faq, category: category!.name };
	});

	return <Faqs categories={categories} initialFAQs={newFaqs} />;
};

export default FAQ;
