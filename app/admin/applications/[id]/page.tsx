'use server';
import { createClient } from '@/utils/supabase/server';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoArrowBack, IoCheckmarkCircle, IoCloseCircle, IoDocument } from 'react-icons/io5';
import countries from '@/data/countries.json';
import PdfViewer from './PdfViewer';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { approve, reject } from './actions';
const Application = async ({ params }: { params: { id: string } }) => {
	const supabase = createClient();
	const fetchApplication = async () => {
		const { data, error } = await supabase.from('applications').select('*').eq('user_id', params.id).single();
		if (error) {
			console.error(error);
			return;
		}
		return data;
	};

	const data = await fetchApplication();

	const setToNotStarted = async () => {
		if (data?.status === 'not_started') {
			await supabase.from('applications').update({ status: 'in_progress' }).eq('user_id', params.id);
		}
	};
	setToNotStarted();

	const fetchPublicURL = async () => {
		if (!data?.resume_url) return;
		const { data: url } = supabase.storage.from('resumes').getPublicUrl(data?.resume_url);
		return url.publicUrl;
	};
	const url = await fetchPublicURL();
	if (!data) {
		return <div className="text-3xl">No Application found.</div>;
	}

	return (
		<div className="fc gap-3 items-start w-full">
			<div className="w-full gap-4 bg-neutral-800 fc items-start lg:fr lg:justify-between mb-10 rounded-2xl px-5 py-4">
				<Link href="/admin/applications">
					<Button color="primary" startContent={<IoArrowBack />}>
						Back
					</Button>
				</Link>
				<h3 className="font-bold text-2xl">
					Application for {data.first_name} {data.last_name}
				</h3>
				<form className="gap-3 fr flex-wrap justify-start">
					{url && <PdfViewer url={url} />}
					<input type="text" className="hidden" value={params.id} name="id" />
					<Button type="submit" formAction={approve} color="success" startContent={<IoCheckmarkCircle />}>
						Approve
					</Button>
					<Button type="submit" formAction={reject} color="danger" startContent={<IoCloseCircle />}>
						Reject
					</Button>
				</form>
			</div>

			<div className="w-full fc gap-10">
				<Section title="Short Answers">
					<div className="col-span-4 w-full fc gap-5">
						<Viewer question="Tell us the story of how you began in the computer science field." answer={data.short_ans_1} />
						<Viewer
							question="Tell us the biggest challenge you have ever faced (doesn't have to be related to computer science)."
							answer={data.short_ans_2}
						/>
					</div>
				</Section>
				<Section title="Personal">
					<Viewer question="First Name" answer={data.first_name} />
					<Viewer question="Last Name" answer={data.last_name} />
					<Viewer question="Email" answer={data.email} />
					<Viewer question="Phone" answer={data.phone?.toString() || 'N/A'} />
					<Viewer question="Country" answer={countries.find((c) => c.code === data.country)?.name} />
					<Viewer question="Gender" answer={data.gender} />
					<Viewer question="Age" answer={data.age.toString()} />
				</Section>

				<Section title="School">
					<Viewer question="Level of Study" answer={data.level_of_study} />
					<Viewer question="Graduation Year" answer={data.graduation?.toString() || 'N/A'} />
					<Viewer question="Major" answer={data.major || 'N/A'} />
				</Section>

				<Section title="Experience">
					<Viewer question="Hackathons Attended" answer={data.hackathons_attended.toString()} />
					<Viewer question="Top Interests" answer={data.top_interests.join(', ')} />
					<Viewer question="Confidence in AI/ML" answer={data.confidence.confidence_ai_machine_learning} />
					<Viewer question="Confidence in Back End Dev" answer={data.confidence.confidence_back_end_dev} />
					<Viewer question="Confidence in Cybersecurity" answer={data.confidence.confidence_cybersecurity} />
					<Viewer question="Confidence in Front End Dev" answer={data.confidence.confidence_front_end_dev} />
					<Viewer question="Confidence in Fullstack Dev" answer={data.confidence.confidence_fullstack_dev} />
					<Viewer question="Confidence in Product Management" answer={data.confidence.confidence_product_management} />
					<Viewer question="Confidence in UI/UX Design" answer={data.confidence.confidence_ui_ux_design} />
					<Viewer question="Confidence in Web3/Crypto/Blockchain" answer={data.confidence.confidence_web3_crypto_blockchain} />
				</Section>

				{data.social && (
					<Section title="Social">
						<Viewer
							question="Github"
							answer={
								<Link className="text-blue-500 underline" href={data.social.github}>
									{data.social.github}
								</Link>
							}
						/>
						<Viewer
							question="LinkedIn"
							answer={
								<Link className="text-blue-500 underline" href={data.social.linkedin}>
									{data.social.linkedin}
								</Link>
							}
						/>
						<Viewer
							question="Instagram"
							answer={
								<Link className="text-blue-500 underline" href={data.social.instagram}>
									{data.social.instagram}
								</Link>
							}
						/>
						<Viewer
							question="Twitter"
							answer={
								<Link className="text-blue-500 underline" href={data.social.twitter}>
									{data.social.twitter}
								</Link>
							}
						/>
						<Viewer
							question="Portfolio"
							answer={
								<Link className="text-blue-500 underline" href={data.social.portfolio}>
									{data.social.portfolio}
								</Link>
							}
						/>
					</Section>
				)}
			</div>
		</div>
	);
};
const Viewer = ({ question, answer }: { question: string; answer: React.ReactNode }) => {
	return (
		<div className="fc items-start gap-2 w-full">
			<p className="text-lg font-bold">{question}</p>
			<p>{answer}</p>
		</div>
	);
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
	return (
		<div className="fc gap-5 w-full items-start">
			<h2 className="text-3xl font-bold">{title}</h2>
			<div className="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">{children}</div>
		</div>
	);
};

export default Application;
