'use client';
// Core viewer

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { themePlugin } from '@react-pdf-viewer/theme';

import React from 'react';
import { ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button, Modal } from '@nextui-org/react';
import { IoDocument } from 'react-icons/io5';

const PdfViewer = ({ url }: { url: string }) => {
	// Create new plugin instance
	const defaultLayoutPluginInstance = defaultLayoutPlugin();
	const themePluginInstance = themePlugin();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Button startContent={<IoDocument />} onPress={onOpen}>
				Open Resume
			</Button>
			<Modal size="full" isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Resume</ModalHeader>
							<ModalBody>
								<object className="w-full h-full rounded-2xl" type="application/pdf" data={url} />
							</ModalBody>
							<ModalFooter>
								<Button color="danger" onPress={onClose}>
									Close
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default PdfViewer;
