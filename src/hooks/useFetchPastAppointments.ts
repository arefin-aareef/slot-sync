import { useEffect, useState } from 'react';
import useFetchAUser from './useFetchAUser';
import useFetchAllAppointments from './useFetchAllAppointments';

const useFetchPastAppointments = () => {
	const { user } = useFetchAUser();
	const { appointments } = useFetchAllAppointments();

	const [pastAppointments, setPastAppointments] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const currentDateTime = new Date();

	useEffect(() => {
		try {
			setLoading(true);
			const filteredAppointments = appointments?.filter(appointment => {
				const appointmentDateTime = new Date(
					`${appointment.date}T${appointment.time}`
				);

				return (
					(appointment?.appointee === user?.uid ||
						appointment?.invitee === user?.uid) &&
					appointmentDateTime < currentDateTime
				);
			});
			setPastAppointments(filteredAppointments);
		} catch (error) {
			setError('Error filtering past appointments');
			console.error('Error filtering past appointments:', error);
		} finally {
			setLoading(false);
		}
	}, [user, appointments]);

	return { pastAppointments, loading, error };
};

export default useFetchPastAppointments;
