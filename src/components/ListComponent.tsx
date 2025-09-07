import {
    Box, VStack, Text, Table, Stack, Spinner, Alert, AlertIcon
} from '@chakra-ui/react';
import Loading from "@/components/Loading.tsx";

const ListComponent = ({
                           entityList,
                           entityType,
                           entity,
                           isLoading,
                           nameProp,
                       }) => {
    if (isLoading) return (
        <Loading></Loading>
    );
    return (
        <VStack align="stretch" spacing={3}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                {entity} ({entityList.length})
            </Text>
            {entityList.map((entity) => (
                <Box
                    key={entity.name}
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    width="100%"
                    boxShadow="sm"
                    _hover={{bg: 'gray.50'}}
                    transition="background 0.2s"
                >
                    <Text fontWeight="bold" fontSize="lg" mb={2}>{entity[nameProp]}</Text>
                    <Text fontSize="sm" color="gray.600" mb={3}>{entity.description}</Text>
                    <Text fontSize="xs" color="gray.500">
                        {entityType === 'users' ? (
                            `Email: ${entity.email || 'Not available'}`
                        ) : (
                            `Assignee: ${entity.assigneeName || 'Not assigned'} | Owner: ${entity.ownerName || 'Not assigned'}`
                        )}
                    </Text>
                </Box>
            ))}
        </VStack>
    )
}

export default ListComponent;
