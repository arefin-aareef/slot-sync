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
	Input,
} from '@chakra-ui/react';
import Column from '@/components/Column';
import useFetchAllUser from '@/hooks/useFetchAllUser';
import useRequireAuth from '@/hooks/useRequireAuth';
import Loader from '@/components/Loader';
import AppointmentModal from '@/components/AppointmentModal';

type User = {
	id: string;
	name: string;
	email: string;
};

const Home: React.FC = () => {
	const { users, loading } = useFetchAllUser();
	const { authLoading } = useRequireAuth();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [searchTerm, setSearchTerm] = useState('');

	if (authLoading || loading) {
		return <Loader />;
	}

	const filteredUsers = users?.filter(
		(user: User) =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleOpenModal = (user: User) => {
		setSelectedUser(user);
		onOpen();
	};

	return (
		<PageLayout>
			<Column>
				<Input
					placeholder='Search user by name or email'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					focusBorderColor='green.300'
					mb={4}
					
				/>

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
							{filteredUsers?.map((user: User) => (
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
