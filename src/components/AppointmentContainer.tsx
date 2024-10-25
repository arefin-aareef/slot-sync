import React, { FC } from 'react';
import Column from './Column';
import { Grid, Text } from '@chakra-ui/react';
import AppointmentCard from './AppointmentCard';

type AppointmentContainerProps = {
	heading: string;
	appointments: any;
};

const AppointmentContainer: FC<AppointmentContainerProps> = ({
	heading,
	appointments,
}) => {
	const title = heading?.split(' ')[0].toLowerCase();
	return (
		<Column
			border='1px'
			alignItems='center'
			borderColor='gray.300'
			borderRadius='md'
			p={2}
		>
			<Text fontSize='2xl' mb={4}>
				{heading}
			</Text>
			<Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} w='full' gap={2}>
				{appointments.length > 0 ? (
					appointments.map((appointment: any) => (
						<AppointmentCard
							appointment={appointment}
						/>
					))
				) : (
					<Text>No {title} appointments found.</Text>
				)}
			</Grid>
		</Column>
	);
};

export default AppointmentContainer;
