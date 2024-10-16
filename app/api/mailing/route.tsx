import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import Approved from '@/emails/approved';
import Rejected from '@/emails/rejected';
import { createClient } from '@/utils/supabase/server';
import AppReceived from '@/emails/application_received';

export async function POST(request: Request) {
	const supabase = createClient();
	const body = await request.json();
	const resend = new Resend(process.env.RESEND);
	const { name, email, type, code } = body;

	// const { data, error } = await supabase.auth.getSession();
	// if (error || !data) {
	//   console.error(error);
	//   return NextResponse.json({ error }, { status: 500 });
	// }

	if (!name || !email || !type) {
		return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
	}

	const { data, error } = await resend.emails.send({
		from: 'Hack49 Team<team@hack49.com>',
		to: [email],
		subject: 'Hack49 Application Status Update',
		react:
			type === 'rejected'
				? Rejected({ name, email })
				: type === 'received'
				? AppReceived({
						email,
						code: code,
				  })
				: Approved({ name, email, code }),
	});

	if (error) {
		console.error(error);
		return NextResponse.json({ error }, { status: 500 });
	}

	return NextResponse.json({ data });
}
