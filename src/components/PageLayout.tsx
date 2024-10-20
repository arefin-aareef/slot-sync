import { Flex, FlexProps } from '@chakra-ui/react';
import React, { FC } from 'react';
import Navbar from './Navbar';
import Column from './Column';
import { usePathname } from 'next/navigation';

type PageLayoutProps = FlexProps & {
	children: any;
};

const PageLayout: FC<PageLayoutProps> = ({ children, ...props }) => {
	// HOOKS
	const pathname = usePathname();
	// STATE

	// VARIABLES

	// STYLES

	// FUNCTIONS

	// EFFECTS

	// COMPONENTS

	return (
		<Column minH={'100vh'}>
			{pathname !== '/login' && pathname !== '/register' && <Navbar />}
			<Column px={{base: '20px', md: '120px'}} {...props}>
				{children}
			</Column>
		</Column>
	);
};

export default PageLayout;
