import { cn } from '@/lib/utils';
import { createClient } from '@/utils/supabase/client';
import { Button, Chip } from '@nextui-org/react';
import React, { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { User } from '@/node_modules/@supabase/auth-js/src/lib/types';
import { IoClose } from 'react-icons/io5';

export default function DnD({ user, onChange, onBlur, value }: { user: User; onChange: any; onBlur: any; value: any }) {
	// accept pdf only
	const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, acceptedFiles } = useDropzone({
		accept: { 'application/pdf': [] },
		maxFiles: 1,
	});

	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [buttonL, setButtonL] = useState(false);

	const supabase = createClient();

	const sendToSupabase = async (file: File) => {
		setButtonL(true);
		// before sending, we must check if there is already a file in the folder, as there can only be one file
		const { data: files, error: filesError } = await supabase.storage.from('resumes').list(`${user.id}/`);
		console.log(files);
		if (files?.length > 1) {
			toast.error('You can only upload one file');
			setButtonL(false);
			return;
		}

		console.log(`${user.id}/${file.name}`);
		const { data, error } = await supabase.storage.from('resumes').upload(`${user.id}/${file.name}`, file);

		if (error) {
			console.error(error);
			toast.error(error.message);
			setButtonL(false);
		} else {
			console.log(data);
			toast.success('Resume uploaded successfully');
			onChange({ target: { value: `${user.id}/${file.name}` } });
			setUploadedFiles([...uploadedFiles, { name: file.name, uploaded: true }]);
			setButtonL(false);
		}
	};

	useEffect(() => {
		const getAllFiles = async () => {
			const { data, error } = await supabase.storage.from('resumes').list(`${user.id}/`);

			if (error) {
				console.error(error);
				toast.error(error.message);
			} else {
				console.log(data);
				const set = [...uploadedFiles, data.map((f) => ({ name: f.name, uploaded: true })).flat()];
				// filter out file with name '.emptyFolderPlaceholder'

				setUploadedFiles(set.flat().filter((f) => f.name !== '.emptyFolderPlaceholder'));
			}
		};
		getAllFiles();
	}, []);

	const deleteFromSupabase = async (file) => {
		console.log(`${user.id}/${file.name}`);
		const { data, error } = await supabase.storage.from('resumes').remove([`${user.id}/${file.name}`]);

		if (error) {
			console.error(error);
			toast.error(error.message);
		} else {
			console.log(data);
			toast.success('Resume deleted successfully');
			setUploadedFiles(uploadedFiles.filter((f) => f.name !== file.name));
		}
	};

	return (
		<div onBlur={onBlur} className="fc gap-5 w-full items-start">
			<div
				className={cn('w-full border-dashed border-2 transition-colors border-neutral-700 rounded-2xl fc py-12 bg-neutral-800', {
					'border-blue-500': isFocused,
					'border-green-500': isDragAccept,
					'border-red-500': isDragReject,
				})}
				{...getRootProps()}
			>
				<input {...getInputProps()} />
				<div className="fc gap-3">
					<p>Drag 'n' drop your resume here, or click to browse</p>
					<Chip color="primary">PDF only</Chip>
				</div>
			</div>

			<div className="w-full fr justify-between">
				{acceptedFiles.length > 0 && (
					<div className="w-full fc items-start">
						<h3 className="text-lg font-bold">Accepted</h3>

						{acceptedFiles.map((file) => (
							<div className="fr gap-3" key={file.path}>
								<p>{file.path}</p>
								{uploadedFiles.filter((f) => f.name === file.name).length === 0 && (
									<Button isLoading={buttonL} onClick={() => sendToSupabase(file)}>
										Upload
									</Button>
								)}
							</div>
						))}
					</div>
				)}
				<div className="w-full bg-green-500/30 border-2 border-dashed border-green-500/30 px-10 py-5 rounded-xl">
					<h3 className="text-lg font-bold mb-3">Uploaded Files</h3>
					<div className="fc gap-2 w-full items-start">
						{uploadedFiles.length === 0 ? (
							<p className="text-neutral-300">No files uploaded yet</p>
						) : (
							uploadedFiles.map((file) => (
								<div className="fr justify-start gap-3 w-full" key={file.name}>
									<p>{file.name}</p>
									{file.uploaded ? (
										<div className="fr gap-2">
											<Button
												onClick={() => deleteFromSupabase(uploadedFiles.find((f) => f.name === file.name))}
												color="danger"
												startContent={<IoClose />}
											>
												Delete File
											</Button>
											{/* <Link>Open URL</Link> */}
										</div>
									) : (
										<Button onClick={() => sendToSupabase(file)} color="primary">
											Upload
										</Button>
									)}
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
