import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
	return NextResponse.json({ authorized: false });
	const resend = new Resend(process.env.RESEND);

	const { data } = await resend.contacts.list({
		audienceId: '846181cc-3b35-47d6-a6ee-f69a68d761d4',
	});
	console.log('contacts', data);
	if (!data) {
		return NextResponse.json({ success: true });
	}

	for (let i = 0; i < data.data.length; i++) {
		const contact = data.data[i];
		const { data: c, error } = await resend.contacts.remove({
			id: contact.id,
			audienceId: '846181cc-3b35-47d6-a6ee-f69a68d761d4',
		});
		console.log('contact removed', c);
		if (error) {
			console.log('error', error);
		}
		await new Promise((resolve) => setTimeout(resolve, 500));
	}
	return NextResponse.json({ success: true });
}
