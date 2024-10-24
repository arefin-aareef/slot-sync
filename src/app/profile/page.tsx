'use client';
import React, { FC } from 'react';
import PageLayout from '@/components/PageLayout';
import useFetchAUser from '@/hooks/useFetchAUser';
import useRequireAuth from '@/hooks/useRequireAuth';
import Loader from '@/components/Loader';

type ProfilePageProps = {};

const ProfilePage: FC<ProfilePageProps> = ({}) => {
	const { user, loading } = useFetchAUser();
	const { authLoading } = useRequireAuth();

	if (authLoading || loading) {
		return <Loader />;
	}

	return (
		<PageLayout>
			<div>
				{user ? (
					<>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<img
								src={user.photo}
								width={'40%'}
								style={{ borderRadius: '50%' }}
							/>
						</div>
						<h3>Welcome {user.name} 🙏🙏</h3>
						<div>
							<p>Email: {user.email}</p>
							<p>Name: {user.name}</p>
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
