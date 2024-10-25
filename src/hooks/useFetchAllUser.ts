import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import useFetchAUser from './useFetchAUser';

const useFetchAllUser = () => {
	const [users, setUsers] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const { user } = useFetchAUser();

	const fetchUsers = async () => {
		try {
			setLoading(true);
			const querySnapshot = await getDocs(collection(db, 'Users'));
			const usersData = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			}));
			setUsers(usersData);
		} catch (error) {
			setError('Error fetching users');
			console.error('Error fetching users:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	// Filter out the logged-in user from the users array
	const allUserExceptMe = users.filter(item => item.uid !== user?.uid);

	return { users: allUserExceptMe, loading, error };
};

export default useFetchAllUser;
