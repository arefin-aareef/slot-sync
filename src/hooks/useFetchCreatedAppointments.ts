import { useEffect, useState } from 'react';
import useFetchAUser from './useFetchAUser';
import useFetchAllAppointments from './useFetchAllAppointments';

const useFetchCreatedAppointments = () => {
	const { user } = useFetchAUser();
	const { appointments } = useFetchAllAppointments();

	const [createdAppointments, setCreatedAppointments] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		try {
			setLoading(true);
			const currentDateTime = new Date();
			const filteredAppointments = appointments?.filter(appointment => {
				const appointmentDateTime = new Date(
					`${appointment?.date}T${appointment?.time}`
				);
				return (
					appointment?.appointee === user?.uid &&
					appointment?.status === 'pending' &&
					appointmentDateTime > currentDateTime
				);
			});
			setCreatedAppointments(filteredAppointments);
		} catch (error) {
			setError('Error filtering pending appointments');
			console.error('Error filtering pending appointments:', error);
		} finally {
			setLoading(false);
		}
	}, [user, appointments]);

	return { createdAppointments, loading, error };
};

export default useFetchCreatedAppointments;
