import React from 'react';
import { Box, VStack, Text, Button, Badge } from '@chakra-ui/react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeExample: React.FC = () => {
  const { theme, themeName, toggleTheme } = useTheme();

  return (
    <Box p={6} bg={theme.colors.surface} borderRadius="md" border="1px solid" borderColor={theme.colors.border}>
      <VStack spacing={4} align="start">
        <Text fontSize="xl" fontWeight="bold" color={theme.colors.text}>
          Theme System Example
        </Text>
        
        <Text color={theme.colors.textSecondary}>
          Current theme: <Badge colorScheme="blue">{themeName}</Badge>
        </Text>
        
        <VStack spacing={2} align="start">
          <Text color={theme.colors.text}>Theme Colors:</Text>
          <Box display="flex" gap={2} flexWrap="wrap">
            <Box w="20px" h="20px" bg={theme.colors.primary} borderRadius="sm" title="Primary" />
            <Box w="20px" h="20px" bg={theme.colors.secondary} borderRadius="sm" title="Secondary" />
            <Box w="20px" h="20px" bg={theme.colors.success} borderRadius="sm" title="Success" />
            <Box w="20px" h="20px" bg={theme.colors.warning} borderRadius="sm" title="Warning" />
            <Box w="20px" h="20px" bg={theme.colors.error} borderRadius="sm" title="Error" />
          </Box>
        </VStack>
        
        <Button 
          onClick={toggleTheme}
          bg={theme.colors.primary}
          color="white"
          _hover={{ bg: theme.colors.secondary }}
        >
          Toggle Theme
        </Button>
        
        <Text fontSize="sm" color={theme.colors.textSecondary}>
          This component uses the theme context to access colors and theme information.
        </Text>
      </VStack>
    </Box>
  );
};

export default ThemeExample;
