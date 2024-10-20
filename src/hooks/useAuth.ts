import { useEffect, useState } from 'react';
import { auth } from '../../firebase';

const useAuth = () => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setIsLoggedIn(!!user);
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

	return isLoggedIn;
};

export default useAuth;
