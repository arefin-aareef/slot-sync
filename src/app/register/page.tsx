'use client';
import Column from '@/components/Column';
import PageLayout from '@/components/PageLayout';
import { Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { auth, db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import useToast from '@/hooks/useCustomToast';
import useCustomToast from '@/hooks/useCustomToast';
import { useRouter } from 'next/navigation';

type RegisterPageProps = {};

const RegisterPage: FC<RegisterPageProps> = ({}) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const showToast = useCustomToast();
	const router = useRouter();

	const handleRegister = async (e: any) => {
		e.preventDefault();
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;

			if (user) {
				await setDoc(doc(db, 'Users', user.uid), {
					uid: user.uid,
					email: user.email,
					name: name,
				});
			}

			showToast('Registration successful.', 'User registered and logged in.', 'success');
			router.push('/');
		} catch (error) {
			showToast('Registration failed.', 'Please try again.', 'error');
			console.log('Registration error: ', error);
		}
	};

	return (
		<PageLayout alignItems={'center'} justifyContent={'center'} minH={'90vh'}>
			<form onSubmit={handleRegister}>
				<Column
					border='1px'
					borderColor={'gray.300'}
					borderRadius={'10px'}
					w={'360px'}
					direction={'column'}
					p={'12px'}
					gap={4}
				>
					<Heading textAlign={'center'}>Register</Heading>
					<Column>
						<Text>Name</Text>
						<Input
							type='text'
							placeholder='Enter full name'
							focusBorderColor='green.300'
							onChange={e => setName(e.target.value)}
						/>
					</Column>
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
							Register
						</Button>
					</Flex>
					<Flex gap={1}>
						<Text>Already have an account?</Text>
						<Link href={'/login'}>
							<Text _hover={{ color: 'blue' }}>Login here!</Text>
						</Link>
					</Flex>
				</Column>
			</form>
		</PageLayout>
	);
};

export default RegisterPage;
