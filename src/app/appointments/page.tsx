'use client';
import React, { FC, useRef, useState } from 'react';
import {
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Button,
	Flex,
	Input,
	Select,
} from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import Column from '@/components/Column';
import Loader from '@/components/Loader';
import PageLayout from '@/components/PageLayout';
import useCustomToast from '@/hooks/useCustomToast';
import useFetchAllAppointments from '@/hooks/useFetchAllAppointments';
import useFetchAUser from '@/hooks/useFetchAUser';
import useRequireAuth from '@/hooks/useRequireAuth';
import { db } from '../../../firebase';

const AppointmentPage: FC = () => {
	const { authLoading } = useRequireAuth();
	const { appointments } = useFetchAllAppointments();
	const { user } = useFetchAUser();
	const [searchTerm, setSearchTerm] = useState('');
	const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');
	const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const currentDateTime = new Date();

	const myAppointments = appointments.filter((appointment: any) => {
		return (
			appointment.appointee === user?.uid || appointment.invitee === user?.uid
		);
	});

	const categorizedAppointments = myAppointments.map((appointment: any) => {
		const appointmentDateTime = new Date(
			`${appointment.date}T${appointment.time}`
		);
		return {
			...appointment,
			type: appointmentDateTime < currentDateTime ? 'Past' : 'Upcoming',
		};
	});

	const filteredAppointments = categorizedAppointments.filter(appointment => {
		const lowerCaseSearchTerm = searchTerm.toLowerCase();
		return (
			appointment.title.toLowerCase().includes(lowerCaseSearchTerm) ||
			appointment.type.toLowerCase().includes(lowerCaseSearchTerm) ||
			appointment.status.toLowerCase().includes(lowerCaseSearchTerm)
		);
	});

	const sortedAppointments = filteredAppointments.sort((a, b) => {
		const dateA = new Date(`${a.date}T${a.time}`);
		const dateB = new Date(`${b.date}T${b.time}`);
		return sortOrder === 'latest'
			? dateB.getTime() - dateA.getTime()
			: dateA.getTime() - dateB.getTime();
	});

	const showToast = useCustomToast();

	const updateAppointmentStatus = async (newStatus: string, id: string) => {
		try {
			const appointmentRef = doc(db, 'appointments', id);
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

	const toggleAudioPlayback = (audioUrl: string, appointmentId: string) => {
		if (audioRef.current) {
			if (playingAudioId === appointmentId) {
				audioRef.current.pause();
				setPlayingAudioId(null);
			} else {
				audioRef.current.src = audioUrl;
				audioRef.current.play();
				setPlayingAudioId(appointmentId);
			}
		}
	};

	if (authLoading) {
		return <Loader />;
	}

	return (
		<PageLayout>
			<Column>
				<Flex mb={4} alignItems='center' gap={2} justifyContent={'center'}>
					<Input
						placeholder='Search by title, type, or status'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						focusBorderColor='green.300'
					/>
					<Select
						value={sortOrder}
						onChange={e => setSortOrder(e.target.value as 'latest' | 'oldest')}
						w={{ base: '150px', md: '250px' }}
						focusBorderColor='green.300'
					>
						<option value='latest'>Latest first</option>
						<option value='oldest'>Oldest first</option>
					</Select>
				</Flex>
				<TableContainer>
					<Table variant='simple' size={{ base: 'sm', md: 'md' }}>
						<Thead>
							<Tr>
								<Th>Title</Th>
								<Th>Date</Th>
								<Th>Time</Th>
								<Th>Status</Th>
								<Th>Type</Th>
								<Th>Audio</Th>
								<Th>Action</Th>
							</Tr>
						</Thead>
						<Tbody>
							{sortedAppointments.length === 0 ? (
								<Tr>
									<Td colSpan={7} textAlign='center'>
										No appointments found.
									</Td>
								</Tr>
							) : (
								sortedAppointments.map((appointment: any) => {
									const appointmentDateTime = new Date(
										`${appointment.date}T${appointment.time}`
									);
									return (
										<Tr key={appointment.id}>
											<Td>{appointment.title}</Td>
											<Td>{moment(appointment.date).format('DD MMM YYYY')}</Td>
											<Td>{appointment.time}</Td>
											<Td>{appointment.status}</Td>
											<Td>{appointment.type}</Td>
											<Td>
												{appointment.audioMessage && (
													<Button
													w='60px'
														size={{ base: 'xs', md: 'sm' }}
														colorScheme={
															playingAudioId === appointment.id ? 'red' : 'blue'
														}
														onClick={() =>
															toggleAudioPlayback(
																appointment.audioMessage,
																appointment.id
															)
														}
													>
														{playingAudioId === appointment.id
															? 'Pause'
															: 'Play'}
													</Button>
												)}
											</Td>
											<Td>
												{appointmentDateTime >= currentDateTime &&
													appointment.status === 'pending' &&
													appointment?.invitee === user?.uid && (
														<Flex gap={2}>
															<Button
																size={{ base: 'xs', md: 'sm' }}
																colorScheme='green'
																onClick={() =>
																	updateAppointmentStatus(
																		'accepted',
																		appointment.id
																	)
																}
															>
																Accept
															</Button>
															<Button
																size={{ base: 'xs', md: 'sm' }}
																colorScheme='red'
																onClick={() =>
																	updateAppointmentStatus(
																		'declined',
																		appointment.id
																	)
																}
															>
																Decline
															</Button>
														</Flex>
													)}
												{appointmentDateTime >= currentDateTime &&
													appointment?.status === 'pending' &&
													appointment?.appointee === user?.uid && (
														<Flex gap={2}>
															<Button
																size={{ base: 'xs', md: 'sm' }}
																colorScheme='red'
																onClick={() =>
																	updateAppointmentStatus(
																		'canceled',
																		appointment.id
																	)
																}
															>
																Cancel
															</Button>
														</Flex>
													)}
											</Td>
										</Tr>
									);
								})
							)}
						</Tbody>
					</Table>
				</TableContainer>
				<audio ref={audioRef} onEnded={() => setPlayingAudioId(null)} />
			</Column>
		</PageLayout>
	);
};

export default AppointmentPage;
