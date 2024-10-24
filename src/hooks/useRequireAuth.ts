import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

const useRequireAuth = () => {
	const { isLoggedIn, authLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!authLoading && !isLoggedIn) {
			router.push('/login');
		}
	}, [isLoggedIn, authLoading, router]);

	return { isLoggedIn, authLoading };
};

export default useRequireAuth;
