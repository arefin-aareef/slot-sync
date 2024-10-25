import useFetchAUser from '@/hooks/useFetchAUser';
import useFetchAllUser from '@/hooks/useFetchAllUser'; // Assuming this hook fetches all users except the logged-in user
import {
	Button,
	Modal,
	ModalBody,
	ModalBodyProps,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	Input,
	Textarea,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

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
	const { user } = useFetchAUser(); // Get the logged-in user
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!title || !description || !date || !time ) {
			alert('Please fill in all fields'); // Basic validation
			return;
		}

		const appointmentData = {
			title,
			description,
			date,
			time,
			invitee: selectedUser?.id,
			appointee: user.uid,
			status: 'pending', // Set the status
		};

		try {
			const docRef = await addDoc(
				collection(db, 'appointments'),
				appointmentData
			);
			console.log('Appointment created with ID: ', docRef.id);
			onClose(); // Close the modal after successful submission
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
				<ModalBody pb={6}>
					<form onSubmit={handleSubmit}>
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
							required
						/>

						<Input
							type='time'
							mt={4}
							value={time}
							onChange={e => setTime(e.target.value)}
							required
						/>

						<Button type='submit' colorScheme='green' mt={4}>
							Create Appointment
						</Button>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme='red' onClick={onClose}>
						Cancel
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AppointmentModal;
