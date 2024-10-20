import { Flex, FlexProps } from '@chakra-ui/react';
import React, { FC } from 'react';

type ColumnProps = FlexProps & {
	children?: any;
};

const Column: FC<ColumnProps> = ({ children, ...props }) => {
	// HOOKS

	// STATE

	// VARIABLES

	// STYLES

	// FUNCTIONS

	// EFFECTS

	// COMPONENTS

	return (
		<Flex direction={'column'} w={'full'} {...props}>
			{children}
		</Flex>
	);
};

export default Column;
