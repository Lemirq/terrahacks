import OnlyTake from '@/emails/onlytakev3';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET(request: NextRequest) {
	const supabase = createClient();
	// get all applications that are not complete
	const { data, error } = await supabase.from('applications').select('*').eq('complete', 'false');
	if (!data) return NextResponse.json({ error: 'No data found' }, { status: 404 });
	// reduce to array
	const uids = data.map((e) => e.user_id);
	// get all emails
	const { data: emails } = await supabase.from('users').select('email').in('uid', uids);

	// get all applications user ids, all uids from user table, and subtract the two to get the uids that are not in the applications table
	const { data: usersData } = await supabase.from('users').select('uid');
	const usersUids = usersData.map((e) => e.uid);

	const allApps = await supabase.from('applications').select('user_id');
	const allAppsUids = allApps.data.map((e) => e.user_id);

	const notInApps = usersUids.filter((e) => !allAppsUids.includes(e));
	console.log(notInApps);

	// get all emails from notInApps uids
	const { data: notInAppsEmails } = await supabase.from('users').select('email').in('uid', notInApps);
	const notInAppsE = notInAppsEmails.map((e) => e.email);

	// merge emails from notInApps and emails
	const newEmails = [...emails.map((e) => e.email), ...notInAppsE];

	// now we have all emails, split into chunks of 50
	const chunkSize = 50;
	const emailChunks = newEmails.reduce((acc, e, i) => {
		const chunkIndex = Math.floor(i / chunkSize);
		if (!acc[chunkIndex]) {
			acc[chunkIndex] = [];
		}
		acc[chunkIndex].push(e);
		return acc;
	}, []);

	console.log(emailChunks);

	// foreach chunk, send email
	// for (const chunk of emailChunks) {
	const resend = new Resend(process.env.RESEND);
	const sendMail = async () => {
		const { data, error } = await resend.emails.send({
			from: 'Hack49 Team<team@hack49.com>',
			bcc: emailChunks[4],
			subject: 'Hack49 Application Reminder',
			react: <OnlyTake />,
		});
		if (error) {
			console.error(error);
			return NextResponse.json({ error }, { status: 500 });
		}
	};
	sendMail();
	// }
	return NextResponse.json({ emailChunks });
}
