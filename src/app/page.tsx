'use client';

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import PageLayout from '@/components/PageLayout';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
} from '@chakra-ui/react';
import { db } from '../../firebase';
import Column from '@/components/Column';

const Home: React.FC = () => {
	const [users, setUsers] = useState<any[]>([]);

	const fetchUsers = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, 'Users'));
			const usersData = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			}));
			setUsers(usersData);
		} catch (error) {
			console.error('Error fetching users:', error);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<PageLayout>
			<Column>
				<TableContainer>
					<Table variant='simple'>
						<Thead>
							<Tr>
								{/* <Th>ID</Th> */}
								<Th>Name</Th>
								<Th>Email</Th>
							</Tr>
						</Thead>
						<Tbody>
							{users.map(user => (
								<Tr key={user.id}>
									{/* <Td>{user.id}</Td> */}
									<Td>{user.name}</Td>
									<Td>{user.email}</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</Column>
		</PageLayout>
	);
};

export default Home;
