'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { IoVideocamOutline } from 'react-icons/io5';
const Schedule = () => {
	const dates = ['October 19', 'October 20', 'October 21'];
	// const [day, setDay] = useState("October 19");
	// const [index, setIndex] = useState(0);

	// useEffect(() => {
	//   setIndex(dates.indexOf(day));
	// }, [day]);

	const schedule: {
		[key: string]: {
			[key: string]: string | string[] | { title: string; meeting: string }[];
		};
	}[] = [
		{
			'October 19, 2024': {
				'12:00 PM': ['Live Opening Video', 'Hacking Begins'],
				'2:00 PM': 'First Mentoring Session (Finding and Starting a project)',
				'2:30 PM - 3:30 PM': [
					{
						title: 'CoCalc: Collaborative Calculation',
						meeting: 'https://teams.microsoft.com/meet/218233667539?p=rtVZjjp8BFYmYwWyox',
					},
				],
				'4:00 PM - 5:00 PM': [
					{
						title: 'Prompt Engineering 101',
						meeting: 'https://teams.microsoft.com/meet/250940307476?p=Sy2wSlDo51JDC0UUWf',
					},
				],
				'7:30 PM - 8:30 PM': 'Mentoring Session (Getting your project Organized)',
				'9:00 PM - 10:00 PM': [
					{
						title: 'From Idea to Impact: Building an MVP That Matters',
						meeting: 'https://teams.microsoft.com/meet/252442675691?p=wPXdpll8bqZmAtZTfL',
					},
				],
			},
			'October 20, 2024': {
				'10:00 AM - 11:00 AM': [
					{
						title: 'Design Thinking in Hackathons: From Concept to Creation',
						meeting: 'https://teams.microsoft.com/meet/277081493505?p=vRPYxQxSjGzcczBPGO',
					},
				],
				'11:00 AM - 12:00 PM': [
					{
						title: 'Quantum Computing 101',
						meeting: 'https://teams.microsoft.com/meet/273470931632?p=9m7bDm4ABw9ETYNbxf',
					},
				],
				'2:00 PM - 3:00 PM': [
					'Mentoring Session (Logic Issues)',
					{
						title: 'Hacking Your Career: Maximizing your job search success',
						meeting: 'https://teams.microsoft.com/meet/260753223057?p=bgR8MCmMOGtJT0sWle',
					},
				],
				'3:00 PM - 4:00 PM': [
					{
						title: 'Intro to Vision Language and Stable Diffusion Models',
						meeting: 'https://teams.microsoft.com/meet/262571077943?p=asGBdZ5hXq7oRebsKP',
					},
				],
				'6:00 PM - 7:00 PM': 'Mentoring Session (Logic Issues)',
				'9:00 PM - 10:00 PM': [
					{
						title: 'Leveraging LinkedIn and Networking',
						meeting:
							'https://teams.microsoft.com/l/meetup-join/19%3ameeting_MmJhNDVhMDktMTRlMi00ODczLTk4MTItYTMxZjE5MmU5ODZk%40thread.v2/0?context=%7b%22Tid%22%3a%22c109cc70-0687-4ca6-8c1c-c7a9c04938b0%22%2c%22Oid%22%3a%22b63c1ffb-5876-4801-996f-32f82ef2b7d8%22%7d',
					},
				],
			},
			'October 21, 2024': {
				'11:00 AM - 12:00 PM': [
					{
						title: "You don't know what you don't know",
						meeting: 'https://teams.microsoft.com/meet/294240726906?p=79hF3Xb3BcneYDEbH1',
					},
				],
				'2:00 PM - 3:00 PM': [
					'Mentoring Session (Putting it All Together)',
					{
						title: 'AMA with GitHub Campus Expert NY',
						meeting: 'https://teams.microsoft.com/meet/276461974078?p=bI8N6Akwoqtv2K97c4',
					},
				],
				'6:00 PM - 7:00 PM': [
					{
						title: 'AMA with Aidan Ouckama',
						meeting: 'https://teams.microsoft.com/meet/291621300513?p=BZLWiXwgQc9w8qoeu6',
					},
				],
				'9:00 PM - 10:00 PM': 'Mentoring Session (Final Touches)',
				'10:00 PM': 'Hacking Ends',
			},
		},
	];

	const convertToUserTimeZone = (dateStr: string, timeStr: string) => {
		const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
			timeZone: userTimeZone,
		};

		const convertTime = (time: string) => {
			const estDate = new Date(`${dateStr} ${time} GMT-0400`);
			// only return time
			// this returns October 19, 2024 at 4:00 PM
			// we only want 4:00 PM
			const newDate = new Intl.DateTimeFormat('en-US', options).format(estDate);

			return newDate.split('at')[1].trim();
		};

		if (timeStr.includes('-')) {
			const times = timeStr.split('-').map((time) => time.trim());
			const convertedTimes = times.map(convertTime);
			return convertedTimes.join(' - ');
		} else {
			return convertTime(timeStr);
		}
	};

	const adjustScheduleToUserTimeZone = (schedule: any) => {
		const adjustedSchedule = schedule.map((day: any) => {
			const adjustedDay: any = {};
			for (const date in day) {
				adjustedDay[date] = {};
				for (const time in day[date]) {
					const adjustedTime = convertToUserTimeZone(date, time);
					adjustedDay[date][adjustedTime] = day[date][time];
				}
			}
			return adjustedDay;
		});
		return adjustedSchedule;
	};

	const [adjustedSchedule, setAdjustedSchedule] = useState<any>(adjustScheduleToUserTimeZone(schedule));
	useEffect(() => {
		setAdjustedSchedule(adjustScheduleToUserTimeZone(schedule));
	}, [schedule]);

	if (!adjustedSchedule)
		return (
			<div className="fc gap-2 text-lg">
				<p>We're converting the schedule to your local time zone. Please wait a moment.</p>
				{/* show what their timezone is */}
			</div>
		);
	return (
		<section className="w-full py-5 px-5 sm:px-10 fc gap-5 items-start justify-between rounded-2xl border border-zinc-300/30 bg-zinc-900 mt-5">
			<h3 className="text-4xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto tracking-tight font-medium">Schedule</h3>
			<div className="text-lg lg:text-xl max-w-5xl mx-auto fc gap-2">
				All times are in your local time zone. Click on the workshop title to join the workshop.
				<p>
					Your current time zone is <b>{Intl.DateTimeFormat().resolvedOptions().timeZone}</b>.
				</p>
			</div>
			{/* <ChipTabs selected={day} setSelected={setDay} /> */}
			{/* map through schedule and display it */}
			<div className="w-full items-start overflow-x-auto relative">
				<div
					// wrapper for all days to enable horizontal scrolling
					className="fr gap-5"
				>
					{adjustedSchedule.map((scheduleDay, i) => (
						<div
							key={i}
							className="fc w-full gap-10" // Flex-shrink makes each tab's width fixed for scrolling
							style={{ minWidth: '100%' }} // Ensures each day takes up full width
						>
							{Object.keys(scheduleDay).map((date) => (
								<div suppressHydrationWarning className="fc gap-5 items-start w-full sm:w-auto" key={date}>
									<h3 className="text-3xl font-bold">{date}</h3>
									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
										{Object.keys(scheduleDay[date]).map((time) => (
											<div className="fc gap-2 items-start h-auto w-full" key={time}>
												<h4 suppressHydrationWarning className="text-2xl font-semibold">
													{time}
												</h4>
												{Array.isArray(scheduleDay[date][time]) ? (
													<ul className="list-disc list-inside flex-1">
														{scheduleDay[date][time].map((event) => (
															<>
																{event.title ? (
																	<li key={event.title} className="fc items-start gap-3 list-disc">
																		<span>{event.title}</span>
																		<Link target="_blank" href={event.meeting}>
																			<Button startContent={<IoVideocamOutline />} className="bg-[#494CA4]">
																				Join Workshop
																			</Button>
																		</Link>
																	</li>
																) : (
																	<li key={event}>{event}</li>
																)}
															</>
														))}
													</ul>
												) : (
													<p>{scheduleDay[date][time].title ? scheduleDay[date][time].title : scheduleDay[date][time]}</p>
												)}
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Schedule;
