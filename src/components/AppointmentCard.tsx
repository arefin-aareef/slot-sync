import React, { FC } from 'react';
import Column from './Column';
import { Button, Flex, FlexProps, Text } from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import useCustomToast from '@/hooks/useCustomToast';
import useFetchAUser from '@/hooks/useFetchAUser';

type AppointmentCardProps = FlexProps & {
	appointment: any;
};

const AppointmentCard: FC<AppointmentCardProps> = ({ appointment }) => {
	const { user } = useFetchAUser();

	console.log('user', user);

	const showToast = useCustomToast();

	const updateAppointmentStatus = async (newStatus: string) => {
		try {
			const appointmentRef = doc(db, 'appointments', appointment.id);
			await updateDoc(appointmentRef, { status: newStatus });
			showToast(
				`Appointment ${newStatus}`,
				`You have ${newStatus} the appointment.`,
				'success'
			);
			window.location.reload();
		} catch (error) {
			console.error('Error updating appointment status:', error);
		}
	};

	const appointmentDateTime = new Date(
		`${appointment.date}T${appointment.time}`
	);
	const currentDateTime = new Date();
	console.log('appointmentDateTime', appointmentDateTime);
	console.log('currentDateTime', currentDateTime);
	return (
		<Column
			key={appointment.id}
			border='1px'
			borderColor='gray.300'
			borderRadius='md'
			p={4}
			w='full'
			gap={2}
		>
			<Text fontWeight='bold'>Title: {appointment.title}</Text>
			<Text>Description: {appointment.description}</Text>
			<Text>Date: {appointment.date}</Text>
			<Text>Time: {appointment.time}</Text>
			<Text>Status: {appointment.status}</Text>
			{appointment.status === 'pending' &&
				appointment?.invitee === user?.uid && (
					<Flex gap={2}>
						<Button
							size={'sm'}
							colorScheme='green'
							onClick={() => updateAppointmentStatus('accepted')}
						>
							Accept
						</Button>
						<Button
							size={'sm'}
							colorScheme='red'
							onClick={() => updateAppointmentStatus('declined')}
						>
							Decline
						</Button>
					</Flex>
				)}
			{appointment?.status === 'pending' &&
				appointment?.appointee === user?.uid && (
					<Flex gap={2}>
						<Button
							size={'sm'}
							colorScheme='red'
							onClick={() => updateAppointmentStatus('canceled')}
						>
							Cancel
						</Button>
					</Flex>
				)}
		</Column>
	);
};

export default AppointmentCard;
