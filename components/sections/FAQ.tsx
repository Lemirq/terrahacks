import { getAllCategories, getAllFAQs } from '@/utils/supabase/actions';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionItem } from '@nextui-org/react';
const FAQ = () => {
	const [faqs, setFaqs] = useState(null);

	useEffect(() => {
		getAllFAQs().then((response) => {
			// every faq has a category, group by category. Create main array with objects inside. Each object has a category key and an array of faqs
			const groupedFaqs = response.reduce((acc, faq) => {
				const category = faq.category;
				if (!acc[category]) {
					acc[category] = [];
				}
				acc[category].push(faq);
				return acc;
			}, {});

			const faqArray = Object.keys(groupedFaqs).map((category) => {
				return {
					category,
					faqs: groupedFaqs[category],
				};
			});

			// category is an ID
			getAllCategories().then((categories) => {
				faqArray.forEach((faqGroup) => {
					faqGroup.category = categories.find((category) => category.id == faqGroup.category).name;
				});
				setFaqs(faqArray);
			});
		});
	}, []);

	return (
		<section id="faq" className="w-full px-5 sm:px-10 fc gap-10 max-w-6xl mx-auto my-24">
			<h3 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium">
				Frequently Asked Questions
			</h3>
			<p className="text-lg text-neutral-300">Look at this cool FAQ section!</p>
			<div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 ">
				{faqs && (
					<>
						{faqs.map((item, index) => (
							<div key={index} className="bg-neutral-800 rounded-lg p-5">
								<h3 className="text-2xl text-white w-full text-center">{item.category}</h3>
								<Accordion>
									{item.faqs.map((faq, index) => (
										<AccordionItem key={faq.question} aria-label={faq.question} title={faq.question}>
											<p>{faq.answer}</p>
										</AccordionItem>
									))}
								</Accordion>
							</div>
						))}
					</>
				)}
			</div>
		</section>
	);
};

export default FAQ;
