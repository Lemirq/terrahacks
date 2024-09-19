import { createClient } from '@/utils/supabase/server';
import { ScrollShadow } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

const Responses = async () => {
	const supabase = createClient();

	const { data: ans1, error } = await supabase.from('applications').select('short_ans_1, id:user_id').neq('short_ans_1', null);

	const { data: ans2, error: error2 } = await supabase.from('applications').select('short_ans_2, id:user_id').neq('short_ans_2', null);
	if (error || error2) {
		console.error(error || error2);
		return <div>Something went wrong</div>;
	}
	console.log(ans1, ans2);
	return (
		<div className="w-full h-full overflow-x-hidden justify-start fc">
			<div className="w-full fc gap-10">
				<div className="fr gap-3 justify-between w-full">
					<h1 className="text-4xl text-center">Responses</h1>
				</div>
				<h2 className="text-4xl">Short Answer 1</h2>
				<p>Tell us the story of how you began in the computer science field.</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 w-full">
					{ans1.map((ans, index) => (
						<Link href={`/admin/applications/${ans.id}`}>
							<ScrollShadow size={100} className="h-[200px] bg-neutral-800 p-4 rounded-lg shadow-md">
								<p className="text-sm">{ans.short_ans_1}</p>
							</ScrollShadow>
						</Link>
					))}
				</div>
			</div>

			<div className="w-full fc gap-10">
				<div className="fr gap-3 justify-between w-full">
					<h1 className="text-4xl text-center">Responses</h1>
				</div>
				<h2 className="text-4xl">Short Answer 2</h2>
				<p>Tell us the biggest challenge you have ever faced (doesn't have to be related to computer science).</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
					{ans2.map((ans, index) => (
						<Link href={`/admin/applications/${ans.id}`}>
							<ScrollShadow size={100} className="h-[200px] bg-neutral-800 p-4 rounded-lg shadow-md">
								<p className="text-sm">{ans.short_ans_2}</p>
							</ScrollShadow>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Responses;
