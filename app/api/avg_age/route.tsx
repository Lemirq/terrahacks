import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const supabase = createClient();
	const { data, error } = await supabase.from('applications').select('gender, created_at');

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	// Filter applications created on September 29-30
	const filteredData = data.filter((item) => {
		const createdAt = new Date(item.created_at);
		return createdAt.getMonth() === 8 && (createdAt.getDate() === 29 || createdAt.getDate() === 30);
	});

	// Count male and female applications
	const total = filteredData.length;
	const maleCount = filteredData.filter((item) => item.gender === 'Male').length;
	const femaleCount = filteredData.filter((item) => item.gender === 'Female').length;

	// Calculate percentages
	const malePercentage = (maleCount / total) * 100;
	const femalePercentage = (femaleCount / total) * 100;

	return NextResponse.json({
		malePercentage: malePercentage.toFixed(2),
		femalePercentage: femalePercentage.toFixed(2),
		total: total,
	});
}
