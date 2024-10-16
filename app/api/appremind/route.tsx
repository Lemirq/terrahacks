import CompleteApp from '@/emails/complete_app';
import OnlyTake from '@/emails/onlytake copy';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET(request: NextRequest) {
	// fetch all applications that arent compelte and created_at is less than 5 days
	const supabase = createClient();
	// get user
	const gte = new Date();
	const lte = new Date();
	// gte.setDate(gte.getDate() - 10);
	// lte.setDate(lte.getDate() - 3);

	console.log(gte.toISOString(), lte.toISOString());

	const {
		data: { user },
		error: URROR,
	} = await supabase.auth.getUser();

	if (!user || !user?.email?.endsWith('hack49.com')) {
		return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
	}

	const { data, error } = await supabase
		.from('applications')
		.select('email')
		// filter by created_at one week ago from now
		.eq('complete', true);
	// .gte("created_at", gte.toISOString())
	// .lte("created_at", lte.toISOString());
	if (error) {
		console.error(error);
		return NextResponse.json(error, { status: 500 });
	}
	console.log(data);
	const completedApps = data.map((app) => app.email);

	// fetch from users table
	const getUsers = async () => {
		const { data, error } = await supabase.from('users').select('email');
		if (error) {
			console.error(error);
			return [];
		}
		return data;
	};

	const users = await getUsers();

	// match user_id col in applications with id in users

	// subtract completedApps from emails
	let filtered = users.filter((email) => !completedApps.includes(email.email));
	console.log(filtered);
	filtered = filtered.map((email) => email.email);
	// remove users that have completed the application from applications table

	// splice into chunks of 50
	const chunks = [];
	let i = 0;
	while (i < filtered.length) {
		chunks.push([...filtered.slice(i, i + 49)]);
		i += 49;
	}

	// console.log(chunks);

	// return NextResponse.json({ emails: chunks });

	const resend = new Resend(process.env.RESEND);
	// for each chunk send email

	const { data: rData, error: rError } = await resend.emails.send({
		from: 'Hack49 Team<team@hack49.com>',
		to: 'team@hack49.com',
		bcc: filtered,
		subject: '🚨 Last Chance! Hack49 Applications Close on October 10th—Apply Now!',
		react: <OnlyTake />,
	});

	if (rError) {
		console.error(rError);
	}

	// console.log(rData);
	// return NextResponse.json({ emails: chunks });
	return NextResponse.json({ ping: 'pong' });
}
