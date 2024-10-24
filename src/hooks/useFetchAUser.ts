import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const useFetchAUser = () => {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchUserData = async () => {
		try {
			setLoading(true);
			auth.onAuthStateChanged(async (user: any) => {
				const docRef = doc(db, 'Users', user.uid);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					setUser(docSnap.data());
				} else {
					console.log('User is not logged in');
				}
			});
		} catch (error) {
			setError('Error fetching user');
			console.error('Error fetching user:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	return { user, loading, error };
};

export default useFetchAUser;
