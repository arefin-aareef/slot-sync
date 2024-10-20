'use client'
import React, { FC, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import PageLayout from '@/components/PageLayout';

type ProfilePageProps = {};

const ProfilePage: FC<ProfilePageProps> = ({}) => {
	// HOOKS
	const [userDetails, setUserDetails] = useState<any>(null);
	const fetchUserData = async () => {
		auth.onAuthStateChanged(async (user: any) => {
			console.log(user);

			const docRef = doc(db, 'Users', user.uid);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setUserDetails(docSnap.data());
				console.log(docSnap.data());
			} else {
				console.log('User is not logged in');
			}
		});
	};
	useEffect(() => {
		fetchUserData();
	}, []);
	// STATE

	// VARIABLES

	// STYLES

	// FUNCTIONS
	async function handleLogout() {
		try {
			await auth.signOut();
			window.location.href = '/login';
			console.log('User logged out successfully!');
		} catch (error) {
			console.error('Error logging out:', error);
		}
	}

	// EFFECTS

	// COMPONENTS

	return (
		<PageLayout>
			<div>
				{userDetails ? (
					<>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<img
								src={userDetails.photo}
								width={'40%'}
								style={{ borderRadius: '50%' }}
							/>
						</div>
						<h3>Welcome {userDetails.name} 🙏🙏</h3>
						<div>
							<p>Email: {userDetails.email}</p>
							<p>Name: {userDetails.name}</p>
							{/* <p>Last Name: {userDetails.lastName}</p> */}
						</div>
					
					</>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</PageLayout>
	);
};

export default ProfilePage;
