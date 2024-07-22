import { getAllFAQs } from '@/utils/supabase/actions';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@nextui-org/react';
import React from 'react';
import { IoTrash } from 'react-icons/io5';

const DeleteFAQ = ({ faq, setFAQs }: { faq: { question: string; answer: string; category: string; id: number }; setFAQs: (faqs: any) => void }) => {
	const supabase = createClient();
	const handleDelete = async () => {
		const { data, error } = await supabase.from('faq').delete().eq('id', faq.id);
		if (error) {
			console.error(error);
			return;
		}

		getAllFAQs().then((response) => {
			setFAQs(response);
		});
	};

	return (
		<Button onClick={handleDelete} isIconOnly color="danger">
			<IoTrash />
		</Button>
	);
};

export default DeleteFAQ;
