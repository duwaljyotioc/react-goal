import {Box, VStack, useColorModeValue, HStack, Spacer} from "@chakra-ui/react";
import { Link,} from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Box>
            <Box
                height="3rem"
                borderBottom="1px solid black"
                display="flex"
                alignItems="center"
                px={4}
                bg="blue.600"
                color="white"
            >
                <HStack width="100%" justify="space-between">
                    <Box fontWeight="bold" fontSize="lg" color="white">
                        Goal App
                    </Box>
                    <ThemeToggle variant="button" size="sm" />
                </HStack>
            </Box>

            <Box
                display="flex"

            >
                <Box
                    height="calc(100vh - 7rem)"
                    paddingRight={"1rem"}
                    paddingTop={"3rem"}
                    borderRight="1px solid black"
                    minWidth={"10rem"}
                >
                    <VStack align="start" spacing={4}>
                        <Box
                            as={Link}
                            to="/projects"
                            width="100%"
                            p={2}
                            borderRadius="md"
                            _hover={{ bg: useColorModeValue('gray.200', 'gray.600') }}
                            _activeLink={{ fontWeight: 'bold', color: 'brand.500' }}
                        >
                            Projects
                        </Box>
                        <Box
                            as={Link}
                            to="/users"
                            width="100%"
                            p={2}
                            borderRadius="md"
                            _hover={{ bg: useColorModeValue('gray.200', 'gray.600') }}
                            _activeLink={{ fontWeight: 'bold', color: 'brand.500' }}
                        >
                            Users
                        </Box>
                    </VStack>
                </Box>

                <Box
                    paddingLeft={"1rem"}
                    paddingTop={"2rem"}
                    maxHeight={'80vh'}
                    overflowX="auto"
                    width={'90%'}
                >
                    {children}
                </Box>
            </Box>

        </Box>
    )
}

export default Layout;
