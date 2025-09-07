import {Box, Spinner} from "@chakra-ui/react";

const Loading = () => {
    return (
        <Box p={4}>
            <Spinner size="lg" thickness="4px" speed="0.65s" color="brand.500"/>
        </Box>
    )
};

export default Loading;
