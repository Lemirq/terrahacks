import React, { useState } from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Checkbox,
	Input,
	Link,
	Select,
	SelectItem,
} from '@nextui-org/react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { getAllFAQs } from '@/utils/supabase/actions';

export default function EditFAQ({
	faq,
	setFAQs,
	categories,
}: {
	faq: { question: string; answer: string; category: string; id: number };
	categories: any;
	setFAQs: (faqs: any) => void;
}) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [question, setQuestion] = useState(faq.question);
	const [answer, setAnswer] = useState(faq.answer);
	const [category, setCategory] = useState(new Set([faq.category]));

	const client = createClient();

	const edit = async () => {
		// filter in supabase
		const { data, error } = await client.from('faq').update({ question, answer, category: category.values().next().value }).eq('id', faq.id);
		if (error) {
			console.log(error);
		}
		console.log(data);
		toast.success('FAQ edited successfully');
		getAllFAQs().then((response) => {
			console.log(response);
			setFAQs(response);
		});
	};

	return (
		<div>
			<Button onPress={onOpen}>Edit</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Edit FAQ</ModalHeader>
							<ModalBody>
								<Input
									autoFocus
									label="Question"
									placeholder="Question"
									variant="bordered"
									defaultValue={question}
									onChange={(e) => setQuestion(e.target.value)}
									value={question}
								/>
								<Input
									label="Answer"
									placeholder="Answer"
									variant="bordered"
									defaultValue={answer}
									onChange={(e) => setAnswer(e.target.value)}
									value={answer}
								/>
								<Select selectedKeys={category} onSelectionChange={setCategory} label="Select a category" variant="bordered">
									{categories.map((category) => (
										<SelectItem key={category.id}>{category.name}</SelectItem>
									))}
								</Select>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="flat" onPress={onClose}>
									Close
								</Button>
								<Button
									color="primary"
									onPress={async () => {
										await edit();

										onClose();
									}}
								>
									Save Changes
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
}
