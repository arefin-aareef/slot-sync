import { useToast } from '@chakra-ui/react';

const useCustomToast = () => {
	const toast = useToast();
	return (
		message: string,
		description: string,
		status: 'success' | 'error'
	) => {
		toast({
			title: message,
			description: description,
			status: status,
			duration: 2000,
			isClosable: true,
		});
	};
};

export default useCustomToast;
