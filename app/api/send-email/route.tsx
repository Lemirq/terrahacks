import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import Contact from '@/emails/email-template';
export async function POST(request: Request) {
	const body = await request.json();

	const { name, email, message, date } = body;

	const resend = new Resend(process.env.RESEND);

	const { data, error } = await resend.emails.send({
		from: name + '<contact@hack49.com>',
		to: ['hackfortynine@gmail.com'],
		subject: 'Email from Hack49',
		text: `${name} (${email}) sent you a message on ${date}:\n\n${message}`,
		react: Contact({ name, email, message, date }),
	});

	if (error) {
		console.error(error);
		return NextResponse.json({ error }, { status: 500 });
	}

	return NextResponse.json({ data });
}
