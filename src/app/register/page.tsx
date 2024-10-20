'use client';
import Column from '@/components/Column';
import PageLayout from '@/components/PageLayout';
import { Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { auth, db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

type RegisterPageProps = {};

const RegisterPage: FC<RegisterPageProps> = ({}) => {
	// HOOKS

	// STATE
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// VARIABLES

	// STYLES

	// FUNCTIONS

	const handleRegister = async (e: any) => {
		e.preventDefault();
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			const user = auth.currentUser;
			if (user) {
				await setDoc(doc(db, 'Users', user.uid), {
					email: user.email,
					name: name,
				});
			}
			alert('User Registered Successfully.');
			console.log('User Registered Successfully!!');
		} catch (error) {
			console.log(error);
			alert(error);
		}
	};

	// EFFECTS

	// COMPONENTS

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
