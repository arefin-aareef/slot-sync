'use client';
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Button,
	useDisclosure,
} from '@chakra-ui/react';
import Column from '@/components/Column';
import useFetchAllUser from '@/hooks/useFetchAllUser';
import useRequireAuth from '@/hooks/useRequireAuth';
import Loader from '@/components/Loader';
import AppointmentModal from '@/components/AppointmentModal';

// Define a type for the user
type User = {
	id: string;
	name: string;
	email: string;
};

const Home: React.FC = () => {
	const { users, loading, error } = useFetchAllUser();
	const { authLoading } = useRequireAuth();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedUser, setSelectedUser] = useState<User | null>(null);

	console.log('users', users);
	if (authLoading || loading) {
		return <Loader />;
	}

	if (error) {
		return <div>{error}</div>;
	}

	const handleOpenModal = (user: User) => {
		setSelectedUser(user);
		onOpen();
	};

	return (
		<PageLayout>
			<Column>
				<TableContainer>
					<Table variant='simple'>
						<Thead>
							<Tr>
								<Th>Name</Th>
								<Th>Email</Th>
								<Th>Action</Th>
							</Tr>
						</Thead>
						<Tbody>
							{users?.map((user: User) => (
								<Tr key={user?.id}>
									<Td>{user?.name}</Td>
									<Td>{user?.email}</Td>
									<Td>
										<Button
											size={'sm'}
											colorScheme={'green'}
											onClick={() => handleOpenModal(user)}
										>
											Set Appointment
										</Button>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
				<AppointmentModal
					selectedUser={selectedUser}
					isOpen={isOpen}
					onClose={onClose}
				/>
			</Column>
		</PageLayout>
	);
};

export default Home;
