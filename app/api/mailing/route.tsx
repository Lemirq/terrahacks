import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import Approved from '@/emails/approved';
import Rejected from '@/emails/rejected';
import { createClient } from '@/utils/supabase/server';
export async function POST(request: Request) {
	const supabase = createClient();
	const body = await request.json();
	const resend = new Resend(process.env.RESEND);
	const { name, email, type } = body;

	const { data, error } = await supabase.auth.getSession();
	if (error || !data) {
		console.error(error);
		return NextResponse.json({ error }, { status: 500 });
	}

	if (!name || !email || !type) {
		return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
	}

	if (type === 'rejected') {
		const { data, error } = await resend.emails.send({
			from: 'Hack49 Team<team@hack49.com>',
			to: [email],
			subject: 'Hack49 Application Status Update',
			react: Rejected({ name, email }),
		});

		if (error) {
			console.error(error);
			return NextResponse.json({ error }, { status: 500 });
		}

		return NextResponse.json({ data });
	} else if (type === 'accepted') {
		const { data, error } = await resend.emails.send({
			from: 'Hack49 Team<team@hack49.com>',
			to: [email],
			subject: 'Hack49 Application Status Update',
			react: Approved({ name, email }),
		});

		if (error) {
			console.error(error);
			return NextResponse.json({ error }, { status: 500 });
		}

		return NextResponse.json({ data });
	}

	return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
}
