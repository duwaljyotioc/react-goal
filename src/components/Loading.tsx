import {Box, Spinner} from "@chakra-ui/react";

const Loading = () => {
	return (
		<Box
			p={4}
			display="flex"
			alignItems="center"
			justifyContent="center"
			minH="50vh"
		>
			<Spinner size="lg" thickness="4px" speed="0.65s" color="brand.500"/>
		</Box>
	)
};

export default Loading;
