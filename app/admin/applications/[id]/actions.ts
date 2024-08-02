'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const approve = async (formData: FormData) => {
	const supabase = createClient();
	await supabase.from('applications').update({ status: 'accepted' }).eq('user_id', formData.get('id'));
	redirect('/admin/applications');
};

export const reject = async (formData: FormData) => {
	const supabase = createClient();
	await supabase.from('applications').update({ status: 'rejected' }).eq('user_id', formData.get('id'));
	redirect('/admin/applications');
};
