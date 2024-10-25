import { Button, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React, { FC } from 'react';
import { auth } from '../../firebase';
import useRequireAuth from '@/hooks/useRequireAuth';
import useFetchAUser from '@/hooks/useFetchAUser';

type NavbarProps = {};

const Navbar: FC<NavbarProps> = ({}) => {
	const { isLoggedIn } = useRequireAuth();

	async function handleLogout() {
		try {
			await auth.signOut();
			console.log('User logged out successfully!');
		} catch (error) {
			console.error('Error logging out:', error);
		}
	}

	const { user } = useFetchAUser();

	return (
		<Flex
			w={'full'}
			bg='green.400'
			h='60px'
			alignItems={'center'}
			px={{ base: '20px', md: '120px' }}
			justifyContent={'space-between'}
		>
			<Flex w={'full'}>
				<Link href={'/'}>
					<Text fontSize={{ base: '1rem', lg: '1.5rem' }} color={'white'}>
						Welcome, {user?.name}
					</Text>
				</Link>
			</Flex>
			<Flex w={'full'} gap={2} justifyContent={'flex-end'}>
				<Link href={'/appointments'}>
					<Button size={{ base: 'xs', md: 'sm' }}>Appointments</Button>
				</Link>
				<Link href={'/profile'}>
					<Button size={{ base: 'xs', md: 'sm' }}>History</Button>
				</Link>
				{isLoggedIn ? (
					<Link href={'/login'}>
						<Button size={{ base: 'xs', md: 'sm' }} onClick={handleLogout}>
							Logout
						</Button>
					</Link>
				) : (
					<Link href={'/login'}>
						<Button size={{ base: 'xs', md: 'sm' }}>Login</Button>
					</Link>
				)}
			</Flex>
		</Flex>
	);
};

export default Navbar;
