import { Button, Input, Textarea } from '@nextui-org/react';
import { useRef } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { toast } from 'sonner';
interface FormValues {
	name: string;
	email: string;
	message: string;
}

const resolver: Resolver<FormValues> = async (values) => {
	return {
		values: values.name ? values : {},
		errors: !values.name
			? {
					name: {
						type: 'required',
						message: 'This is required.',
					},
			  }
			: !values.email
			? {
					email: {
						type: 'required',
						message: 'This is required.',
					},
			  }
			: // email pattern regex from https://stackoverflow.com/a/46181
			!values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
			? {
					email: {
						type: 'pattern',
						message: 'Invalid email.',
					},
			  }
			: !values.message
			? {
					message: {
						type: 'required',
						message: 'This is required.',
					},
			  }
			: {},
	};
};

const Form = () => {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm<FormValues>({ resolver });

	const onSubmit = async (data: FormValues) => {
		const formattedData = {
			name: data.name,
			email: data.email,
			message: data.message,
			date: new Date().toLocaleString('en-ca', { hour12: true }) + ', ' + Intl.DateTimeFormat().resolvedOptions().timeZone,
		};

		const fetched = await fetch('/api/send-email', {
			method: 'POST',
			body: JSON.stringify(formattedData),
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		});

		// console.log(await fetched.json());
		fetched.status === 200 ? toast.success('Message sent successfully!') : toast.error('Error sending message!');

		setValue('name', '');
	};

	const nameRef = useRef(null);
	const emailRef = useRef(null);
	const messageRef = useRef(null);

	return (
		<form className="fc items-end gap-3 bg-transparent rounded-xl w-full max-w-xl text-white text-base" onSubmit={handleSubmit(onSubmit)}>
			<div className="fc md:fr gap-3 w-full md:items-start items-start">
				<Input
					isRequired
					label="Name"
					className="w-full"
					placeholder="Enter your name"
					errorMessage={errors.name && 'Name is required'}
					isInvalid={!!errors.name}
					{...register('name', { required: true })}
				/>
				<Input
					isRequired
					label="Email"
					placeholder="Enter your email"
					errorMessage={errors.email && 'Email is required'}
					isInvalid={!!errors.email}
					{...register('email', { required: true })}
				/>
			</div>
			<Textarea
				isRequired
				minRows={10}
				label="Message"
				labelPlacement="outside"
				placeholder="Enter your message"
				className="w-full"
				{...register('message', { required: true })}
			/>
			<Button color="primary" type="submit">
				Send
			</Button>
		</form>
	);
};

export default Form;
