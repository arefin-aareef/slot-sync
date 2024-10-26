'use client';
import Column from '@/components/Column';
import PageLayout from '@/components/PageLayout';
import { Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { auth } from '../../../firebase';
import useCustomToast from '@/hooks/useCustomToast';
import { useRouter } from 'next/navigation';

type LoginPageProps = {};

const LoginPage: FC<LoginPageProps> = ({}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const showToast = useCustomToast();
	const router = useRouter();

	const handleLogin = async (e: any) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			showToast('Login successful.', 'User logged in', 'success');
			router.push('/');
		} catch (error) {
			showToast('Login failed.', `${error}`, 'error');
			console.log('Registration error: ', error);
		}
	};

	return (
		<PageLayout alignItems={'center'} justifyContent={'center'} minH={'90vh'}>
			<form onSubmit={handleLogin}>
				<Column
					border='1px'
					borderColor={'gray.300'}
					borderRadius={'10px'}
					w={'360px'}
					direction={'column'}
					p={'12px'}
					gap={4}
				>
					<Heading textAlign={'center'}>Login</Heading>
					<Column>
						<Text>Email</Text>
						<Input
							type='email'
							placeholder='Enter email'
							focusBorderColor='green.300'
							onChange={e => setEmail(e.target.value)}
						/>
					</Column>
					<Column>
						<Text>Password</Text>
						<Input
							type='password'
							placeholder='Enter password'
							focusBorderColor='green.300'
							onChange={e => setPassword(e.target.value)}
						/>
					</Column>
					<Flex>
						<Button type='submit' colorScheme='green'>
							Login
						</Button>
					</Flex>
					<Flex gap={1}>
						<Text>Do not have an account?</Text>
						<Link href={'/register'}>
							<Text _hover={{ color: 'blue' }}>Register now!</Text>
						</Link>
					</Flex>
				</Column>
			</form>
		</PageLayout>
	);
};

export default LoginPage;
