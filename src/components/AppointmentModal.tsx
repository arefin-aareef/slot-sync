import React, { FC, useState, useRef } from 'react';
import {
	Button,
	Modal,
	ModalBody,
	ModalBodyProps,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	Input,
	Textarea,
	Flex,
	ModalOverlay,
} from '@chakra-ui/react';
import {
	collection,
	addDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import useCustomToast from '@/hooks/useCustomToast';
import useFetchAUser from '@/hooks/useFetchAUser';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

type AppointmentModalProps = ModalBodyProps & {
	isOpen: boolean;
	onClose: () => void;
	selectedUser: any;
};

const AppointmentModal: FC<AppointmentModalProps> = ({
	isOpen,
	onClose,
	selectedUser,
}) => {
	const { user } = useFetchAUser();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [audioFile, setAudioFile] = useState<File | null>(null);
	const [isRecording, setIsRecording] = useState(false);
	const showToast = useCustomToast();
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunks: Blob[] = [];

	const today = new Date();
	const currentTime = today.toTimeString().split(' ')[0].slice(0, 5);

	const resetAll = () => {
		setTitle('');
		setDescription('');
		setDate('');
		setTime('');
		setAudioFile(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!title || !description || !date || !time) {
			showToast('Empty fields', 'Please fill in all fields', 'error');
			return;
		}

		let audioURL = null;
		if (audioFile) {
			try {
				const storage = getStorage();
				const audioRef = ref(storage, `audio/${audioFile.name}-${Date.now()}`);
				await uploadBytes(audioRef, audioFile);
				audioURL = await getDownloadURL(audioRef);
				showToast('Audio added.', 'Audio message added.', 'success');
			} catch (error) {
				console.error('Error uploading audio file:', error);
				showToast('Error uploading audio', `${error}`, 'error');
			}
		}

		const appointmentData = {
			title,
			description,
			date,
			time,
			invitee: selectedUser?.id,
			appointee: user.uid,
			status: 'pending',
			audioMessage: audioURL,
		};

		try {
			const docRef = await addDoc(
				collection(db, 'appointments'),
				appointmentData
			);
			showToast(
				'Appointment created.',
				`Appointment created with ${selectedUser?.name}.`,
				'success'
			);
			resetAll();
			onClose();
		} catch (error) {
			console.error('Error adding document:', error);
			showToast('Error creating appointment.', `${error}.`, 'error');
		}
	};

	const startRecording = async () => {
		setIsRecording(true);
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		const mediaRecorder = new MediaRecorder(stream);
		mediaRecorderRef.current = mediaRecorder;

		mediaRecorder.ondataavailable = event => {
			audioChunks.push(event.data);
		};

		mediaRecorder.onstop = () => {
			const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
			setAudioFile(new File([audioBlob], 'recorded-audio.wav'));
		};

		mediaRecorder.start();
	};

	const stopRecording = () => {
		mediaRecorderRef.current?.stop();
		setIsRecording(false);
	};

	return (
		<Modal
			closeOnOverlayClick={false}
			isOpen={isOpen}
			onClose={onClose}
			isCentered={true}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Set Appointment with {selectedUser?.name}</ModalHeader>
				<ModalCloseButton />
				<form onSubmit={handleSubmit}>
					<ModalBody pb={6} gap={4}>
						<Input
							placeholder='Title'
							mt={4}
							value={title}
							onChange={e => setTitle(e.target.value)}
							required
						/>

						<Textarea
							placeholder='Description'
							mt={4}
							value={description}
							onChange={e => setDescription(e.target.value)}
							required
						/>

						<Input
							type='date'
							mt={4}
							value={date}
							onChange={e => setDate(e.target.value)}
							min={new Date().toISOString().split('T')[0]}
							required
						/>

						<Input
							type='time'
							mt={4}
							value={time}
							min={
								date === new Date().toISOString().split('T')[0]
									? currentTime
									: ''
							}
							onChange={e => setTime(e.target.value)}
							required
						/>

						<Flex direction='column' alignItems='flex-start' mt={4}>
							{isRecording ? (
								<Button colorScheme='red' onClick={stopRecording}>
									Stop Recording
								</Button>
							) : (
								<Button colorScheme='blue' onClick={startRecording}>
									Start Recording
								</Button>
							)}

							{audioFile && <p>Audio recorded: {audioFile.name}</p>}
						</Flex>

						<Flex
							justifyContent={'flex-end'}
							gap={2}
							alignItems={'center'}
							mt={4}
						>
							<Button colorScheme='red' onClick={onClose}>
								Cancel
							</Button>

							<Button type='submit' colorScheme='green'>
								Create Appointment
							</Button>
						</Flex>
					</ModalBody>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default AppointmentModal;
