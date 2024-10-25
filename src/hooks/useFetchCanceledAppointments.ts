import { useEffect, useState } from 'react';
import useFetchAUser from './useFetchAUser';
import useFetchAllAppointments from './useFetchAllAppointments';

const useFetchCanceledAppointments = () => {
	const { user } = useFetchAUser();
	const { appointments } = useFetchAllAppointments();

	const [canceledAppointments, setCanceledAppointments] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		try {
			setLoading(true);
			const filteredAppointments = appointments?.filter(
				appointment =>
					appointment?.invitee === user?.uid &&
					appointment?.status === 'canceled'
			);
			setCanceledAppointments(filteredAppointments);
		} catch (error) {
			setError('Error filtering pending appointments');
			console.error('Error filtering pending appointments:', error);
		} finally {
			setLoading(false);
		}
	}, [user, appointments, loading]);

	return { canceledAppointments, loading, error };
};

export default useFetchCanceledAppointments;