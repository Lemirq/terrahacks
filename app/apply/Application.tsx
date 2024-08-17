'use client';
import InputMask from 'react-input-mask';
import React, { useEffect, useState } from 'react';
import { User } from '@/node_modules/@supabase/auth-js/src/lib/types';
import { Controller, useForm } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';
import { Button, Checkbox, CheckboxGroup, divider, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { TracingBeam } from '@/components/ui/tracing-beam';
import countries from '@/data/countries.json';
import { AttendedHackathons, confidence, confidenceType, genders, interests } from './options';
import { CustomCheckbox } from './CustomCheckbox';
import DnD from './DnD';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

const Application = ({ user }: { user: User }) => {
	const [char1, setChar1] = useState(0);
	const [char2, setChar2] = useState(0);
	const [buttonLoading, setButtonLoading] = useState(false);

	const {
		register,
		handleSubmit,
		control,
		watch,
		reset,
		setValue,
		formState: { errors },
	} = useForm<FormValues>({
		mode: 'onBlur',
		// defaultValues: {
		// 	first_name: user.user_metadata.first_name,
		// 	last_name: user.user_metadata.last_name,
		// 	email: user.email,
		// 	phone_number: '',
		// 	age: 0,
		// 	gender: '',
		// 	country: '',
		// 	level_of_study: '',
		// 	graduation: 0,
		// 	major: '',
		// 	attended_hackathons: 0,
		// 	interests: '',
		// 	confidence: {},
		// },
	});

	const [exists, setExists] = useState(false);

	useEffect(() => {
		const addInitialRow = async () => {
			if (exists) return;
			const { data, error } = await supabase.from('applications').insert({
				user_id: user.id,
				complete: false,
			});
			if (error) {
				setExists(true);
				console.error(error);
				return;
			}
		};
		addInitialRow();
	}, []);

	useEffect(() => {
		setValue('first_name', user.user_metadata.first_name);
		setValue('last_name', user.user_metadata.last_name);
		setValue('email', user.email!);
	}, []);

	interface FormValues {
		age: string;
		first_name: string;
		last_name: string;
		email: string;
		phone_number: string;
		attended_hackathons: string;
		gender: string;
		country: string;
		level_of_study: string;
		graduation: string;
		major: string;
		interests: string[];
		confidence_ui_ux_design: string;
		confidence_front_end_dev: string;
		confidence_back_end_dev: string;
		confidence_fullstack_dev: string;
		confidence_product_management: string;
		confidence_web3_crypto_blockchain: string;
		confidence_cybersecurity: string;
		confidence_ai_machine_learning: string;
		github: string;
		twitter: string;
		instagram: string;
		linkedin: string;
		portfolio: string;
		resume: string;
		short_answer1: string;
		short_answer2: string;
	}

	useFormPersist('application-' + user.id, {
		watch,
		setValue,
		storage: window.localStorage, // default window.sessionStorage
	});

	const errorMessages = {
		first_name: errors.first_name && 'First name is required',
		last_name: errors.last_name && 'Last name is required',
		email: errors.email?.type === 'required' ? 'Email is required' : errors.email?.type === 'pattern' && 'Email is invalid',
		phone: errors.phone_number?.type === 'pattern' && 'Phone number is invalid',
		gender: errors.gender && 'Selecting an option is required',
		country: errors.country && 'Selecting an option is required',
		level_of_study: errors.level_of_study && 'Selecting an option is required',
		graduation:
			errors.graduation?.type === 'required'
				? 'Graduation year is required'
				: errors.graduation?.type === 'pattern'
				? 'Enter a valid year'
				: errors.graduation?.type === 'validate' && 'Enter a year after 2024 and before 2100',
		major: errors.major && 'Major is required',
		attended_hackathons: errors.attended_hackathons && 'Selecting an option is required',
		interests:
			errors.interests?.type === 'required'
				? 'Selecting an option is required'
				: errors.interests?.type === 'validate' && 'Select at least 3 options',
		// make keys for each confidence, and add a message for each
		confidence_front_end_dev: errors.confidence_front_end_dev && 'Selecting an option is required',
		confidence_back_end_dev: errors.confidence_back_end_dev && 'Selecting an option is required',
		confidence_fullstack_dev: errors.confidence_fullstack_dev && 'Selecting an option is required',
		confidence_product_management: errors.confidence_product_management && 'Selecting an option is required',
		confidence_ui_ux_design: errors.confidence_ui_ux_design && 'Selecting an option is required',
		confidence_web3_crypto_blockchain: errors.confidence_web3_crypto_blockchain && 'Selecting an option is required',
		confidence_cybersecurity: errors.confidence_cybersecurity && 'Selecting an option is required',
		confidence_ai_machine_learning: errors.confidence_ai_machine_learning && 'Selecting an option is required',

		// socials
		github: errors.github?.type === 'validate' && 'Enter a valid GitHub profile URL',
		twitter: errors.twitter?.type === 'validate' && 'Enter a valid Twitter profile URL',
		instagram: errors.instagram?.type === 'validate' && 'Enter a valid Instagram profile URL',
		linkedin: errors.linkedin?.type === 'validate' && 'Enter a valid LinkedIn profile URL',
		portfolio: errors.portfolio?.type === 'validate' && 'Enter a valid URL',

		// short answers
		short_answer1:
			errors.short_answer1?.type === 'required'
				? 'Response is required'
				: errors.short_answer1?.type === 'maxLength'
				? `Max 1000 characters (${char1}/1000)`
				: `Min 200 characters (${char1}/1000)`,
		short_answer2:
			errors.short_answer2?.type === 'required'
				? 'Response is required'
				: errors.short_answer2?.type === 'maxLength'
				? `Max 1000 characters (${char2}/1000)`
				: `Min 200 characters (${char2}/1000)`,
	};

	const registerFirstName = {
		errorMessage: errorMessages.first_name,
		isInvalid: !!errors.first_name,
		isRequired: true,
		isDisabled: true,
		...register('first_name', { required: true }),
	};
	const registerLastName = {
		errorMessage: errorMessages.last_name,
		isInvalid: !!errors.last_name,
		isRequired: true,
		isDisabled: true,
		...register('last_name', { required: true }),
	};
	const registerEmail = {
		errorMessage: errorMessages.email,
		isInvalid: !!errors.email,
		isRequired: true,
		isDisabled: true,
		...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ }),
	};

	const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:\/?#[\]@!$&'()*+,;=]*)?$/;

	const registerGithub = {
		errorMessage: errorMessages.github,
		isInvalid: !!errors.github,
		...register('github', {
			validate: (value) => !value || urlRegex.test(value),
		}),
	};

	const registerTwitter = {
		errorMessage: errorMessages.twitter,
		isInvalid: !!errors.twitter,
		...register('twitter', {
			validate: (value) => !value || urlRegex.test(value),
		}),
	};

	const registerInstagram = {
		errorMessage: errorMessages.instagram,
		isInvalid: !!errors.instagram,
		...register('instagram', {
			validate: (value) => !value || urlRegex.test(value),
		}),
	};

	const registerLinkedIn = {
		errorMessage: errorMessages.linkedin,
		isInvalid: !!errors.linkedin,
		...register('linkedin', {
			validate: (value) => !value || urlRegex.test(value),
		}),
	};

	const registerPortfolio = {
		errorMessage: errorMessages.portfolio,
		isInvalid: !!errors.portfolio,
		...register('portfolio', {
			validate: (value) => !value || urlRegex.test(value),
		}),
	};

	const supabase = createClient();
	const router = useRouter();
	const submit = async (data: FormValues) => {
		console.log(data);
		setButtonLoading(true);
		const age = parseInt(data.age);
		const graduation = parseInt(data.graduation);

		const { data: sData, error } = await supabase
			.from('applications')
			.update({
				age: age,
				confidence: {
					confidence_ai_machine_learning: data.confidence_ai_machine_learning,
					confidence_back_end_dev: data.confidence_back_end_dev,
					confidence_cybersecurity: data.confidence_cybersecurity,
					confidence_front_end_dev: data.confidence_front_end_dev,
					confidence_fullstack_dev: data.confidence_fullstack_dev,
					confidence_product_management: data.confidence_product_management,
					confidence_ui_ux_design: data.confidence_ui_ux_design,
					confidence_web3_crypto_blockchain: data.confidence_web3_crypto_blockchain,
				},
				country: data.country,
				email: data.email,
				first_name: data.first_name,
				gender: data.gender,
				graduation: graduation,
				last_name: data.last_name,
				level_of_study: data.level_of_study,
				major: data.major,
				phone: data.phone_number,
				short_ans_1: data.short_answer1,
				short_ans_2: data.short_answer2,
				social: {
					github: data.github,
					instagram: data.instagram,
					linkedin: data.linkedin,
					twitter: data.twitter,
					portfolio: data.portfolio,
				},
				resume_url: data.resume,
				hackathons_attended: parseInt(data.attended_hackathons),
				top_interests: data.interests,
				complete: true,
			})
			.eq('user_id', user.id);
		// const { data: sData, error } = await supabase.from('applications').insert({
		// });

		if (error) {
			console.error(error);
			toast.error(error.message);
			setButtonLoading(false);
			return;
		} else {
			router.push('/apply/success');
			console.log(sData);
			setButtonLoading(false);
		}
	};

	return (
		<TracingBeam className="px-4 pl-6">
			<main className="w-full min-h-screen overflow-hidden relative py-36 fc justify-start">
				<div className="w-full fr justify-start mb-10">
					<Link href="/dashboard">
						<Button color="primary" startContent={<IoArrowBack />}>
							Back to Dashboard
						</Button>
					</Link>
				</div>
				<div className="w-full fc items-start max-w-6xl mx-auto">
					<h1 className="text-3xl font-bold mb-2">Application</h1>
					<p className="text-neutral-300 mb-5">
						Please fill out all required fields to apply. Application will be automatically saved <b>on this device</b>.
					</p>
					<form onSubmit={handleSubmit(submit)} className="w-full fc gap-10">
						<Section title="Personal Information">
							<FieldSeparator>
								<Input label="First Name" placeholder="Enter your first name" {...registerFirstName} />
								<Input label="Last Name" placeholder="Enter your last name" {...registerLastName} />
							</FieldSeparator>
							<FieldSeparator>
								<Input label="Email" placeholder="Enter your email" {...registerEmail} />
								{/* <Input
								type="number" label="Phone Number" placeholder="Enter your phone number" {...registerPhone} /> */}
								{/* const registerPhone = {
		errorMessage: errorMessages.phone,
		isInvalid: !!errors.phone_number,
		...register('phone_number', { required: false, pattern: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/ }),
	}; */}
								<Controller
									name="phone_number"
									control={control}
									rules={{
										required: false,
										pattern: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
									}}
									render={({ field: { onChange, onBlur, value } }) => (
										<InputMask mask="999-999-9999" value={value} onChange={onChange} onBlur={onBlur}>
											{(inputProps) => (
												<Input
													isInvalid={!!errors.phone_number}
													errorMessage={errorMessages.phone}
													type="text"
													label="Phone Number"
													placeholder="Enter your phone number"
													{...inputProps}
												/>
											)}
										</InputMask>
									)}
								/>
							</FieldSeparator>
							<FieldSeparator>
								<Controller
									name="gender"
									control={control}
									rules={{ required: true }} // Add your validation rules here
									render={({ field: { onChange, onBlur, value } }) => (
										<div className="fc gap-2 items-start w-full">
											<Select
												label="Gender"
												placeholder="Select an option"
												isRequired
												isInvalid={!!errors.gender}
												onBlur={onBlur}
												onChange={onChange}
												errorMessage={errorMessages.gender}
												selectedKeys={value ? new Set([value]) : []}
											>
												{genders.map((att) => (
													<SelectItem key={att.value} value={att.value}>
														{att.label}
													</SelectItem>
												))}
											</Select>
										</div>
									)}
								/>
								<Controller
									name="country"
									control={control}
									rules={{ required: true }} // Add your validation rules here
									render={({ field: { onChange, onBlur, value } }) => (
										<div className="fc gap-2 items-start w-full">
											<Select
												label="Country"
												placeholder="Select an option"
												isRequired
												isInvalid={!!errors.country}
												onBlur={onBlur}
												onChange={onChange}
												errorMessage={errorMessages.country}
												selectedKeys={value ? new Set([value]) : []}
											>
												{countries.map((country) => (
													<SelectItem startContent={country.emoji} key={country.code} value={country.name}>
														{country.name}
													</SelectItem>
												))}
											</Select>
										</div>
									)}
								/>
								{/* age */}
								<Input
									label="Age"
									isRequired
									placeholder="Enter your age"
									type="number"
									{...register('age', { required: true })}
									isInvalid={!!errors.age}
									errorMessage={errors.age && 'Age is required'}
								/>
							</FieldSeparator>
						</Section>

						{/* School */}
						<Section title="School">
							<Controller
								name="level_of_study"
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, onBlur, value } }) => (
									<div className="fc gap-2 items-start w-full">
										<Select
											label="Current Level of Study"
											placeholder="Select an option"
											isInvalid={!!errors.level_of_study}
											onBlur={onBlur}
											isRequired
											onChange={(e) => {
												onChange(e);
											}}
											errorMessage={errorMessages.level_of_study}
											selectedKeys={value ? new Set([value]) : []}
										>
											{['Primary School', 'High School', 'Undergraduate', 'Graduate', 'Working Professional', 'Other'].map(
												(level) => (
													<SelectItem key={level} value={level}>
														{level}
													</SelectItem>
												)
											)}
										</Select>
									</div>
								)}
							/>
							<Controller
								name="graduation"
								control={control}
								rules={{
									required: true,
									// match a 4 digit year
									pattern: /^[0-9]{4}$/,
									// larger than 2024
									validate: (value) => parseInt(value) > 2024 && parseInt(value) < 2100,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<div className="fc gap-2 items-start w-full">
										<Input
											label="Expected Graduation"
											placeholder="Enter your expected graduation year"
											isRequired
											type="number"
											isInvalid={!!errors.graduation}
											onBlur={onBlur}
											onChange={onChange}
											value={value}
											errorMessage={errorMessages.graduation}
											description="Enter a random year if this doesn't apply to you"
										/>
									</div>
								)}
							/>
							<Controller
								name="major"
								control={control}
								rules={{ required: true }}
								render={({ field: { onChange, onBlur, value } }) => (
									<div className="fc gap-2 items-start w-full">
										<Input
											label="Major"
											placeholder="Enter your major (Computer Science, High school diploma etc.)"
											isRequired
											isInvalid={!!errors.major}
											onBlur={onBlur}
											onChange={onChange}
											value={value}
											errorMessage={errorMessages.major}
											description="Enter N/A if this doesn't apply to you"
										/>
									</div>
								)}
							/>
						</Section>

						{/* Experience */}
						<Section title="Experience">
							<Controller
								name="attended_hackathons"
								control={control}
								rules={{ required: true }} // Add your validation rules here
								render={({ field: { onChange, onBlur, value } }) => (
									<Select
										labelPlacement="outside"
										classNames={{
											label: 'text-left',
										}}
										label="How many hackathons have you attended before?"
										placeholder="Select an option"
										isRequired
										isInvalid={!!errors.attended_hackathons}
										onBlur={onBlur}
										onChange={onChange}
										errorMessage={errorMessages.attended_hackathons}
										selectedKeys={value ? new Set([value]) : []}
									>
										{AttendedHackathons.map((att) => (
											<SelectItem key={att.value} value={att.value}>
												{att.label}
											</SelectItem>
										))}
									</Select>
								)}
							/>
							<Controller
								name="interests"
								control={control}
								rules={{ required: true, validate: (value) => value.length >= 3 }} // Add your validation rules here
								render={({ field: { onChange, onBlur, value } }) => {
									const handleCheckboxChange = (e) => {
										// console.log(e);
										// return;
										// e is the array of options selected
										// limit options to 4
										if (e.length >= 4) return;
										onChange(e);
									};

									return (
										<div className="fc gap-1 w-full mt-5">
											<CheckboxGroup
												className="gap-1"
												label="Choose 3 of your top interests"
												orientation="horizontal"
												isInvalid={!!errors.interests}
												errorMessage={errorMessages.interests}
												value={value}
												onBlur={onBlur}
												onChange={handleCheckboxChange}
											>
												{interests.map((option) => (
													// <Checkbox
													// 	isDisabled={value && !value.includes(option.label) && value.length >= 4}
													// 	key={option.value}
													// 	value={option.label}
													// >
													// 	{option.label}
													// </Checkbox>
													<CustomCheckbox
														isDisabled={value && !value.includes(option.label) && value.length >= 4}
														key={option.value}
														value={option.label}
													>
														{option.label}
													</CustomCheckbox>
												))}
											</CheckboxGroup>
										</div>
									);
								}}
							/>

							{/* Next, I need a confidence section. Users will be presented with UI/UX Design
Front End Development
Backend Development
Fullstack Development 
Product Management
Web3, Crypto, BlockChain
Cybersecurity
AI/Machine Learning 

and a dropdown to select their confidence level in each of these areas.
from not confident, somewhat confident, confident, very confident, expert
For each, there will be a dropdown to select their confidence level.  
All the data should be added to the 'confidence' object in the form data. */}
							<div className="w-full fc items-start gap-2 mt-5">
								<p>How confident are you in the following areas?</p>
								<p className="text-sm">
									If you're a beginner, don't worry! This hackathon is a great place to learn and grow. If you're an expert, we'd
									love to see what you can do!
								</p>
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
									{confidence.map((item: confidenceType) => {
										const { value, label } = item;
										return (
											<Controller
												key={value}
												name={value}
												control={control}
												rules={{
													// string should be a valid value
													validate: (value) =>
														['Not confident', 'Somewhat confident', 'Confident', 'Very confident', 'Expert'].includes(
															value
														),
													required: true,
												}}
												render={({ field: { onChange, onBlur, value: broski } }) => (
													<Select
														label={label}
														placeholder="Select an option"
														isRequired
														isInvalid={!!errors[value]}
														onBlur={onBlur}
														onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
															onChange(e.target.value);
														}}
														errorMessage={errorMessages[value]}
														selectedKeys={broski ? new Set([broski]) : []}
													>
														{['Not confident', 'Somewhat confident', 'Confident', 'Very confident', 'Expert'].map(
															(level) => (
																<SelectItem key={level} value={level}>
																	{level}
																</SelectItem>
															)
														)}
													</Select>
												)}
											/>
										);
									})}
								</div>

								<p>Quick Tip: Use tab and the left/right arrow keys to select quickly</p>
							</div>
						</Section>
						{/* Short answer section */}
						<Section title="Short Answer">
							<Controller
								name="short_answer1"
								control={control}
								rules={{ required: true, maxLength: 1000, minLength: 200 }}
								render={({ field: { onChange, onBlur, value } }) => (
									<div className="fc gap-2 items-start w-full">
										<Textarea
											label="Tell us the story of how you began in the computer science field."
											labelPlacement="outside"
											placeholder="Enter your response"
											isRequired
											size="lg"
											isInvalid={!!errors.short_answer1}
											onBlur={onBlur}
											onChange={(e) => {
												setChar1(e.target.value.length);
												onChange(e.target.value);
											}}
											errorMessage={errorMessages.short_answer1}
											value={value}
											description={`Max 1000 characters (${char1}/1000)`}
										/>
									</div>
								)}
							/>
							<Controller
								name="short_answer2"
								control={control}
								rules={{ required: true, maxLength: 1000, minLength: 200 }}
								render={({ field: { onChange, onBlur, value } }) => (
									<div className="fc gap-2 items-start w-full">
										<Textarea
											label="Tell us the biggest challenge you have ever faced (doesn't have to be related to computer science)."
											labelPlacement="outside"
											placeholder="Enter your response"
											isRequired
											size="lg"
											description={`Max 1000 characters (${char2}/1000)`}
											isInvalid={!!errors.short_answer2}
											errorMessage={errorMessages.short_answer2}
											onBlur={onBlur}
											onChange={(e) => {
												setChar2(e.target.value.length);
												onChange(e.target.value);
											}}
											value={value}
										/>
									</div>
								)}
							/>
						</Section>
						{/* Social Section */}
						<Section title="Social" subheading="These aren't required, but they give us a glimpse of who you are.">
							<FieldSeparator>
								<Input {...registerGithub} label="GitHub" placeholder="https://github.com/elon_musk" />
								<Input {...registerTwitter} label="Twitter" placeholder="https://x.com/elonmusk" />
							</FieldSeparator>
							<FieldSeparator>
								<Input {...registerInstagram} label="Instagram" placeholder="https://www.instagram.com/elonmusk" />
								<Input {...registerLinkedIn} label="LinkedIn" placeholder="https://linkedin.com/in/elonmusk" />
							</FieldSeparator>
							<Input {...registerPortfolio} label="Portfolio" placeholder="Your personal website" />

							{/* Now Drag and drop for the resume */}
							<Controller name="resume" control={control} render={({ field }) => <DnD {...field} user={user} />} />
						</Section>

						{/* Submit */}
						<div className="w-full fc gap-3 items-end">
							<Button
								size="lg"
								color="primary"
								// disabled until all errors are fixed
								isDisabled={Object.keys(errors).length > 0}
								isLoading={buttonLoading}
								type="submit"
							>
								Submit
							</Button>
							<p>Clear all errors to submit the form</p>
						</div>
					</form>
				</div>
			</main>
		</TracingBeam>
	);
};

const FieldSeparator = ({ children }: { children: React.ReactNode }) => (
	<div className="fc sm:fr gap-3 w-full sm:items-start items-start">{children}</div>
);

const Section = ({ title, subheading, children }: { title: string; subheading?: string; children: React.ReactNode }) => (
	<div className="w-full py-5 px-6 bg-neutral-900 rounded-2xl gap-3 fc items-start">
		<div className="fc w-full items-start mb-3">
			<h2 className="text-2xl font-bold">{title}</h2>
			{subheading && <p className="text-neutral-300">{subheading}</p>}
		</div>
		{children}
	</div>
);

export default Application;
