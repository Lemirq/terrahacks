import { Button, Tailwind } from '@react-email/components';
import * as React from 'react';

interface EmailTemplateProps {
	name: string;
	email: string;
	message: string;
	date: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ name, email, message, date }) => (
	<div>
		<h1>From: {name}</h1>
		<h2>Email: {email}</h2>
		<p>{date}</p>
		<br />
		<p>{message}</p>
	</div>
);

interface ApprovedTemplateProps {
	name: string;
	email: string;
}

export const ApprovedTemplate: React.FC<Readonly<ApprovedTemplateProps>> = ({ name, email }) => (
	<Tailwind>
		<p className="text-5xl">{name}</p>
		<Button className="bg-brand px-3 py-2 font-medium leading-4 text-white" href="https://example.com">
			{email}
		</Button>
	</Tailwind>
);
