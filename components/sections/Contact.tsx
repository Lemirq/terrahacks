import React from 'react';
import Form from '../Form';
import { motion } from 'framer-motion';
const Contact = () => {
	return (
		<section id="contact" className="w-full px-5 sm:px-10 fc gap-10 max-w-6xl mx-auto my-24">
			<motion.h3
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium"
			>
				Contact Us
			</motion.h3>
			<Form />
		</section>
	);
};

export default Contact;
