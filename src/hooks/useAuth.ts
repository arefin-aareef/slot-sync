import { useEffect, useState } from 'react';
import { auth } from '../../firebase';

const useAuth = () => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [authLoading, setAuthLoading] = useState<boolean>(true);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setIsLoggedIn(!!user);
			setAuthLoading(false);
		});

		return () => unsubscribe();
	}, []);

	 return { isLoggedIn, authLoading };
};

export default useAuth;
