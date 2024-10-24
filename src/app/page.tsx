'use client';
import React from 'react';
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
import Column from '@/components/Column';
import useFetchAllUser from '@/hooks/useFetchAllUser';
import useRequireAuth from '@/hooks/useRequireAuth';
import Loader from '@/components/Loader';

const Home: React.FC = () => {
	const { users, loading, error } = useFetchAllUser();
	const { authLoading } = useRequireAuth();

	if (authLoading || loading) {
		return <Loader />;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<PageLayout>
			<Column>
				<TableContainer>
					<Table variant='simple'>
						<Thead>
							<Tr>
								<Th>Name</Th>
								<Th>Email</Th>
							</Tr>
						</Thead>
						<Tbody>
							{users.map(user => (
								<Tr key={user.id}>
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
