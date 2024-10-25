import useFetchAUser from '@/hooks/useFetchAUser';
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
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import useCustomToast from '@/hooks/useCustomToast';

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
	const showToast = useCustomToast();

	const today = new Date();
	const currentTime = today.toTimeString().split(' ')[0].slice(0, 5);

	const resetAll = () => {
		setTitle('');
		setDescription('');
		setDate('');
		setTime('');
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!title || !description || !date || !time) {
			showToast('Empty fields', 'Please fill in all fields', 'error');
			return;
		}

		const appointmentData = {
			title,
			description,
			date,
			time,
			invitee: selectedUser?.id,
			appointee: user.uid,
			status: 'pending',
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
			console.error('Error adding document: ', error);
		}
	};

	return (
		<Modal
			closeOnOverlayClick={false}
			isOpen={isOpen}
			onClose={onClose}
			isCentered={true}
		>
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
