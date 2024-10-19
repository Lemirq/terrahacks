import { Button } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
const Schedule = dynamic(() => import('./Schedule'), {
	ssr: false,
});
import JudgingRubric from './JudgingRubric';
import Video from './Video';
import dynamic from 'next/dynamic';

const Accepted = () => {
	return (
		<>
			{/* <section className="w-full py-5 px-5 sm:px-10 fc gap-5 items-start md:fr justify-between rounded-2xl border border-neutral-300/30 bg-neutral-900 mt-5">
				<Link href="/HACK 49 Schedule.pdf">
					<Button color="primary">View Schedule</Button>
				</Link>
			</section> */}
			<Video />
			<Schedule />
			<JudgingRubric />
		</>
	);
};

export default Accepted;
