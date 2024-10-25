'use client';
import React, { FC, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import useFetchPendingAppointments from '@/hooks/useFetchPendingAppointments';
import useRequireAuth from '@/hooks/useRequireAuth';
import Loader from '@/components/Loader';
import Column from '@/components/Column';
import useFetchAcceptedAppointments from '@/hooks/useFetchAcceptedAppointments';
import useFetchDeclinedAppointments from '@/hooks/useFetchDeclinedAppointments';
import useFetchCreatedAppointments from '@/hooks/useFetchCreatedAppointments';
import useFetchCanceledAppointments from '@/hooks/useFetchCanceledAppointments';
import AppointmentContainer from '@/components/AppointmentContainer';

type ProfilePageProps = {};

const ProfilePage: FC<ProfilePageProps> = ({}) => {
	const { authLoading } = useRequireAuth();

	const { pendingAppointments } = useFetchPendingAppointments();
	const { acceptedAppointments } = useFetchAcceptedAppointments();
	const { declinedAppointments } = useFetchDeclinedAppointments();
	const { createdAppointments } = useFetchCreatedAppointments();
	const { canceledAppointments } = useFetchCanceledAppointments();

	const [refetchTrigger, setRefetchTrigger] = useState(false);

	if (authLoading) {
		return <Loader />;
	}

	const handleRefetch = () => setRefetchTrigger(prev => !prev);

	return (
		<PageLayout>
			<Column gap={4}>
				<AppointmentContainer
					heading='Created Appointments'
					appointments={createdAppointments}
					handleRefetch={handleRefetch}
				/>

				<AppointmentContainer
					heading='Upcoming Appointments'
					appointments={pendingAppointments}
					handleRefetch={handleRefetch}
				/>

				<AppointmentContainer
					heading='Accepted Appointments'
					appointments={acceptedAppointments}
					handleRefetch={handleRefetch}
				/>

				<AppointmentContainer
					heading='Declined Appointments'
					appointments={declinedAppointments}
					handleRefetch={handleRefetch}
				/>

				<AppointmentContainer
					heading='Canceled Appointments'
					appointments={canceledAppointments}
					handleRefetch={handleRefetch}
				/>
			</Column>
		</PageLayout>
	);
};

export default ProfilePage;
