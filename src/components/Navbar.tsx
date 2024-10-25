import {
	Button,
	Flex,
	Text,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	useDisclosure,
	IconButton,
	DrawerCloseButton,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { FC } from 'react';
import { auth } from '../../firebase';
import useRequireAuth from '@/hooks/useRequireAuth';
import useFetchAUser from '@/hooks/useFetchAUser';
import { GiHamburgerMenu } from 'react-icons/gi';

type NavbarProps = {};

const Navbar: FC<NavbarProps> = ({}) => {
	const { isLoggedIn } = useRequireAuth();
	const { user } = useFetchAUser();
	const { isOpen, onOpen, onClose } = useDisclosure();

	async function handleLogout() {
		try {
			await auth.signOut();
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
			justifyContent={'space-between'}
		>
			<Flex w={'full'}>
				<Link href={'/'}>
					<Text fontSize={{ base: '1rem', lg: '1.5rem' }} color={'white'}>
						Welcome, {user?.name}
					</Text>
				</Link>
			</Flex>

			{/* Hamburger Icon for Mobile */}
			<IconButton
				aria-label='Open Menu'
				icon={<GiHamburgerMenu />}
				onClick={onOpen}
				display={{ base: 'flex', md: 'none' }}
			/>

			{/* Desktop Menu */}
			<Flex
				w={'full'}
				gap={2}
				justifyContent={'flex-end'}
				display={{ base: 'none', md: 'flex' }}
			>
				<Link href={'/appointments'}>
					<Button size={{ base: 'xs', md: 'sm' }}>Appointments</Button>
				</Link>
				<Link href={'/profile'}>
					<Button size={{ base: 'xs', md: 'sm' }}>History</Button>
				</Link>
				{isLoggedIn ? (
					<Button size={{ base: 'xs', md: 'sm' }} onClick={handleLogout}>
						Logout
					</Button>
				) : (
					<Link href={'/login'}>
						<Button size={{ base: 'xs', md: 'sm' }}>Login</Button>
					</Link>
				)}
			</Flex>

			{/* Drawer for Mobile Menu */}
			<Drawer isOpen={isOpen} placement='right' onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Menu</DrawerHeader>
					<DrawerBody>
						<Flex direction='column' gap={2}>
							<Link href={'/appointments'} onClick={onClose}>
								<Button width='full' colorScheme='green' variant={'outline'}>Appointments</Button>
							</Link>
							<Link href={'/profile'} onClick={onClose}>
								<Button width='full' colorScheme='green' variant={'outline'}>History</Button>
							</Link>
							{isLoggedIn ? (
								<Button
									width='full' colorScheme='green' variant={'outline'}
									onClick={() => {
										handleLogout();
										onClose();
									}}
								>
									Logout
								</Button>
							) : (
								<Link href={'/login'} onClick={onClose}>
									<Button width='full' colorScheme='green' variant={'outline'}>Login</Button>
								</Link>
							)}
						</Flex>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Flex>
	);
};

export default Navbar;
