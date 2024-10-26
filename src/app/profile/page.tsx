'use client';
import React, { FC } from 'react';
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
import useFetchPastAppointments from '@/hooks/useFetchPastAppointments';

type ProfilePageProps = {};

const ProfilePage: FC<ProfilePageProps> = ({}) => {
	const { authLoading } = useRequireAuth();

	const { pendingAppointments } = useFetchPendingAppointments();
	const { acceptedAppointments } = useFetchAcceptedAppointments();
	const { declinedAppointments } = useFetchDeclinedAppointments();
	const { createdAppointments } = useFetchCreatedAppointments();
	const { canceledAppointments } = useFetchCanceledAppointments();
	const { pastAppointments } = useFetchPastAppointments();

	console.log('pastAppointments', pastAppointments);

	if (authLoading) {
		return <Loader />;
	}


	return (
		<PageLayout>
			<Column gap={4}>
				<AppointmentContainer
					heading='Created Appointments'
					appointments={createdAppointments}
				/>

				<AppointmentContainer
					heading='Upcoming Appointments'
					appointments={pendingAppointments}
				/>

				<AppointmentContainer
					heading='Accepted Appointments'
					appointments={acceptedAppointments}
				/>

				<AppointmentContainer
					heading='Declined Appointments'
					appointments={declinedAppointments}
				/>

				<AppointmentContainer
					heading='Canceled Appointments'
					appointments={canceledAppointments}
				/>

				<AppointmentContainer
					heading='Past Appointments'
					appointments={pastAppointments}
				/>
			</Column>
		</PageLayout>
	);
};

export default ProfilePage;
