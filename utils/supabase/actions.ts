import { createClient } from './client';

export const getAllFAQs = async () => {
	const client = createClient();
	const { data, error } = await client.from('faq').select('*');
	if (error) {
		console.error(error);
		throw new Error('Failed to fetch FAQs');
	}
	console.log(data);

	return data;
};

export const getAllCategories = async () => {
	const client = createClient();
	const { data, error } = await client.from('faq_categories').select('*');
	if (error) {
		console.error(error);
		throw new Error('Failed to fetch Categories');
	}
	console.log(data);
	return data;
};

export const getWaitlist = async () => {
	const client = createClient();
	const { data, error } = await client.from('email_list').select('*');
	if (error) {
		console.error(error);
		throw new Error('Failed to fetch Waitlist');
	}
	console.log(data);
	return data;
};
