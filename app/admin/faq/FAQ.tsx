'use client';
import React, { useState } from 'react';
import EditFAQ from './EditFAQ';
import DeleteFAQ from './DeleteFAQ';
import CreateFAQ from './CreateFAQ';

const Faqs = ({ initialFAQs, categories }) => {
	const [faqs, setFaqs] = useState(initialFAQs);
	return (
		<div className="fc gap-3 items-start w-full">
			<CreateFAQ setFAQs={setFaqs} categories={categories} />
			{faqs && categories && (
				<div className="w-full grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
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
