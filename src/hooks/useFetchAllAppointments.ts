import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const useFetchAllAppointments = () => {
	const [appointments, setAppointments] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchAppointments = async () => {
		try {
			setLoading(true);
			const querySnapshot = await getDocs(collection(db, 'appointments'));
			const appointmentsData = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			}));
			setAppointments(appointmentsData);
		} catch (error) {
			setError('Error fetching appointments');
			console.error('Error fetching appointments:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAppointments();
	}, []);

	return { appointments, loading, error };
};

export default useFetchAllAppointments;
