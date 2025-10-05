import { useRef, useEffect } from 'react';
import {
    Box, VStack, Text, Table, Stack, Spinner, Alert, AlertIcon, Button, Input
} from '@chakra-ui/react';
import Loading from "@/components/Loading.tsx";
import {useNavigate} from "react-router-dom";

type ListComponentProps = {
    entityList: any[];
    entityType: string;
    entity: any;
    isLoading: boolean;
    nameProp: string;
    addEntityRoute?: string;
};

const ListComponent = ({
                           entityList,
                           entityType,
                           entity,
                           isLoading,
                           nameProp,
                           addEntityRoute,
                       }: ListComponentProps) => {
    // useRef for scroll management - doesn't cause re-renders
    const scrollContainerRef = useRef(null);
    const scrollToTopRef = useRef(null);
    const navigateInstance = useNavigate();

    // Auto-scroll to top when new data loads
    useEffect(() => {
        if (!isLoading && entityList.length > 0) {
            scrollToTopRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [isLoading, entityList.length]);

    const scrollToTop = () => {
        scrollToTopRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToBottom = () => {
        scrollContainerRef.current?.scrollTo({
            top: scrollContainerRef.current.scrollHeight,
            behavior: 'smooth'
        });
    };

    const addEntity = () => {
        navigateInstance(addEntityRoute);
    };

    if (isLoading) return (
        <Loading></Loading>
    );
    
    return (
        <VStack align="stretch" spacing={3}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                {entity} ({entityList.length})
            </Text>
            
            {/* Scroll control buttons */}
            <Box display="flex" gap={2} mb={4}>
                <Button size="sm" onClick={scrollToTop}>
                    Scroll to Top
                </Button>
                <Button size="sm" onClick={scrollToBottom}>
                    Scroll to Bottom
                </Button>

                {
                    addEntityRoute &&
                      <Button size="sm" onClick={addEntity}>
                        Add {entity}
                      </Button>
                }

                <Input
                    placeholder="Type something here..."
                    maxWidth = '25%'
                />
            </Box>

            {/* Scroll anchor for top */}
            <div ref={scrollToTopRef} />
            
            {/* Scrollable container */}
            <Box 
                ref={scrollContainerRef}
                maxHeight="60vh" 
                overflowY="auto" 
                borderWidth="1px" 
                borderRadius="md"
                p={2}
            >
                {entityList.map((entity) => (
                    <Box
                        key={entity[nameProp]}
                        p={4}
                        borderWidth="1px"
                        borderRadius="md"
                        width="100%"
                        boxShadow="sm"
                        _hover={{bg: 'gray.50'}}
                        transition="background 0.2s"
                        mb={2}
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
            </Box>
        </VStack>
    )
}

export default ListComponent;
