import * as React from 'react';

interface ContactProps {
	name: string;
	email: string;
	message: string;
	date: string;
}

const Contact: React.FC<Readonly<ContactProps>> = ({ name, email, message, date }) => (
	<div>
		<h1>From: {name}</h1>
		<h2>Email: {email}</h2>
		<p>{date}</p>
		<br />
		<p>{message}</p>
	</div>
);

export default Contact;
