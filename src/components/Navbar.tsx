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
			window.location.href = '/login';
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
				<Text fontSize={{ base: '1rem' , lg: '1.5rem' }} color={'white'}>
					Welcome {user?.name}
				</Text>
			</Flex>
			<Flex w={'full'} gap={2} justifyContent={'flex-end'}>
				<Link href={'/'}>
					<Button size='sm'>Home</Button>
				</Link>
				<Link href={'/profile'}>
					<Button size='sm'>Profile</Button>
				</Link>
				{isLoggedIn ? (
					<Button size='sm' onClick={handleLogout}>
						Logout
					</Button>
				) : (
					<Link href={'/login'}>
						<Button size='sm'>Login</Button>
					</Link>
				)}
			</Flex>
		</Flex>
	);
};

export default Navbar;
