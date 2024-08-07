import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const body = await request.json();
	const { name, email } = body;
	const supabase = createClient();

	console.log(name, email);

	// return NextResponse.json({ mes: 'Hello World!' });
	// add to supabase table: email_list
	const { data, error } = await supabase.from('email_list').insert([{ name, email }]);
	if (error) {
		console.log(error);
		if (error.code === '23505') {
			return NextResponse.json({ error: 'Email already exists', status: 'error' });
		}
		return NextResponse.json({ error: error.message, status: 'error' });
	} else {
		return NextResponse.json({ data, status: 'success' });
	}
}
