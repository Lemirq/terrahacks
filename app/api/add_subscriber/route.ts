import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET(req: NextRequest) {
	// get search params
	const params = req.nextUrl.searchParams;
	const email = params.get('email');
	const firstName = params.get('first_name');
	const lastName = params.get('last_name');

	if (!email || !firstName || !lastName) {
		return NextResponse.json({
			error: 'email, first_name and last_name are required',
		});
	}

	const resend = new Resend(process.env.RESEND);

	const { data, error } = await resend.contacts.create({
		email: email,

		firstName: firstName,
		lastName: lastName,
		unsubscribed: false,
		audienceId: '03270469-3ad9-41eb-83dc-44b1aaf13224',
	});

	if (error) {
		return NextResponse.json({ error: error });
	}
	return NextResponse.json({ data: data });
}
