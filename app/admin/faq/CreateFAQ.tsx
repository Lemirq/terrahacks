'use client';
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem } from '@nextui-org/react';
import { createClient } from '@/utils/supabase/client';
import { getAllFAQs } from '@/utils/supabase/actions';

const CreateFAQ = ({ categories, setFAQs }: { categories: any; setFAQs: (faqs: any) => void }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');
	const [category, setCategory] = useState(new Set(['1']));

	const client = createClient();

	const create = async () => {
		const { data, error } = await client.from('faq').insert([{ question, answer, category: category.values().next().value }]);
		if (error) {
			console.error(error);
		}

		// reset states
		setQuestion('');
		setAnswer('');
		setCategory(new Set(['1']));

		const response = await getAllFAQs();
		setFAQs(response);
	};

	return (
		<div>
			<Button onPress={onOpen}>Create</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Create FAQ</ModalHeader>
							<ModalBody>
								<Input
									autoFocus
									label="Question"
									placeholder="Question"
									variant="bordered"
									onChange={(e) => setQuestion(e.target.value)}
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
										await create();

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
};

export default CreateFAQ;
