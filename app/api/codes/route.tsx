import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// archived function used to generate referral codes for users who do not have one

export async function GET(req: NextRequest) {
	return NextResponse.error();

	// this function will fetch all users from the database
	const supabase = createClient();

	// Fetch all users
	const { data: users, error: usersError } = await supabase.from('users').select('*');
	// Fetch referral codes
	const { data: refCodes, error: refCodesError } = await supabase.from('referrals').select('*');

	// Check for errors
	if (usersError || refCodesError) {
		return NextResponse.error();
	}

	// Filter users who have referral codes
	const refCodeUsers = users.filter((user) => refCodes.some((ref) => ref.user_id === user.uid));

	// Filter users who do not have referral codes
	const usersWithoutRefCode = users.filter((user) => !refCodes.some((ref) => ref.user_id === user.uid));

	async function makeID(base: string) {
		let result = base;
		if (!base) {
			base = 'user';
		}
		let counter = 0;

		// Check if the code already exists
		while (true) {
			const { data: codeExists, error: codeExistsError } = await supabase.from('referrals').select('*').eq('code', result);

			if (codeExists && codeExists.length > 0) {
				// If the code exists, append an underscore and a random number
				result = `${base}_${Math.floor(Math.random() * 10000)}`;
			} else {
				// Code is unique, break the loop
				break;
			}

			// Safety to avoid infinite loops (e.g., in case of some unexpected situation)
			if (counter++ > 10) {
				throw new Error('Failed to generate a unique code.');
			}
		}
		return result;
	}

	// create referral codes for users who do not have one
	const makeRefCode = async (user) => {
		const c = await makeID(user.firstName.toLowerCase());
		const { error: codeError } = await supabase.from('referrals').insert({ user_id: user?.uid, code: c });

		if (codeError) {
			console.error(codeError);
			return NextResponse.json({ error: codeError.message }, { status: 500 });
		}
	};

	// do it for all
	usersWithoutRefCode.forEach(async (user) => {
		await makeRefCode(user);
	});

	return NextResponse.json({
		usersWithoutRefCode: usersWithoutRefCode,
		total: users,
		refCodes: refCodes.length,
	});
}
