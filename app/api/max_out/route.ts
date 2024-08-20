import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET(request: NextRequest) {
	return NextResponse.json({ ping: 'pong' });
	const resend = new Resend('re_SWZi6Ah8_CUb7iEpoNXPhjqUP9HykNZUR');
	const { data, error } = await resend.emails.send({
		from: 'Hack49 Team<vihaan@vhaan.me>',
		to: '519vihaansh@gmail.com',
		subject: 'Hack49 Application Status Update',
		text: `Hello Aadi,\n\nYour application for Hack49 has been {status}.`,
	});
}
