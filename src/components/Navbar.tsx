import { Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import React, { FC } from 'react';
import { auth } from '../../firebase';
import useAuth from '@/hooks/useAuth';

type NavbarProps = {};

const Navbar: FC<NavbarProps> = ({}) => {
	// Use the custom hook to check if the user is logged in
	const isLoggedIn = useAuth();

	// FUNCTIONS
	async function handleLogout() {
		try {
			await auth.signOut();
			window.location.href = '/';
			console.log('User logged out successfully!');
		} catch (error) {
			console.error('Error logging out:', error);
		}
	}

	return (
		<Flex
			w={'full'}
			bg='green.400'
			h='60px'
			alignItems={'center'}
			px={{ base: '20px', md: '120px' }}
			justifyContent={'flex-end'}
			gap={2}
		>
			<Link href={'/'}>
				<Button size='sm'>Home</Button>
			</Link>
			{isLoggedIn && (
				<Link href={'/profile'}>
					<Button size='sm'>Profile</Button>
				</Link>
			)}
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
	);
};

export default Navbar;
