'use client';
import { getAllCategories, getAllFAQs } from '@/utils/supabase/actions';
import React, { useEffect, useState } from 'react';
import EditFAQ from './EditFAQ';
import Link from 'next/link';
import { Button, Link as NextLink } from '@nextui-org/react';
import { IoAdd, IoChevronBack } from 'react-icons/io5';
import CreateFAQ from './CreateFAQ';
import { createClient } from '@/utils/supabase/client';
import DeleteFAQ from './DeleteFAQ';

const Faqs = ({ initialFAQs, categories }) => {
	const [faqs, setFaqs] = useState(initialFAQs);
	console.log(faqs);
	console.log(categories);
	return (
		<div className="fc gap-3 items-start w-full max-w-6xl sm:px-10 px-5">
			<CreateFAQ setFAQs={setFaqs} categories={categories} />
			{faqs && categories && (
				<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
					{faqs.map((faq, index) => (
						<div key={index} className="fc gap-3 bg-neutral-800 rounded-lg p-5 items-start justify-between">
							<div className="fc gap-2 items-start">
								<h3 className="text-sm font-bold">{faq.question}</h3>
								<p className="text-xs">Category: {faq.category}</p>

								<p className="text-sm">{faq.answer}</p>
								{/* find category */}
							</div>
							<div className="fr w-full gap-2 justify-start">
								<EditFAQ categories={categories} key={faq.id + 'edit'} faq={faq} setFAQs={setFaqs} />
								<DeleteFAQ setFAQs={setFaqs} key={faq.id + 'delete'} faq={faq} />
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Faqs;
