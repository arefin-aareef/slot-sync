import { Flex, Spinner } from '@chakra-ui/react';
import React, { FC } from 'react';

type LoaderProps = {};

const Loader: FC<LoaderProps> = ({}) => {
	return (
		<Flex
			w={'full'}
			minH={'98vh'}
			alignItems={'center'}
			justifyContent={'center'}
		>
			<Spinner />
		</Flex>
	);
};

export default Loader;
