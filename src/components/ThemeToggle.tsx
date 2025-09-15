import React from 'react';
import { Button, IconButton, HStack, Text } from '@chakra-ui/react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  variant?: 'button' | 'icon' | 'text';
  size?: 'sm' | 'md' | 'lg';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  variant = 'icon', 
  size = 'md' 
}) => {
  const { themeName, toggleTheme } = useTheme();
  const isDark = themeName === 'dark';

  if (variant === 'text') {
    return (
      <Button
        onClick={toggleTheme}
        variant="ghost"
        size={size}
        colorScheme="gray"
      >
        {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </Button>
    );
  }

  if (variant === 'button') {
    return (
      <HStack spacing={2}>
        <Text fontSize="sm" color="white" opacity={0.8}>
          {isDark ? 'Dark' : 'Light'}
        </Text>
        <Button
          onClick={toggleTheme}
          size={size}
          colorScheme="white"
          variant="outline"
          borderColor="white"
          color="white"
          _hover={{ bg: "white", color: "blue.600" }}
        >
          {isDark ? '☀️ Switch' : '🌙 Switch'}
        </Button>
      </HStack>
    );
  }

  // Default icon variant
  return (
    <IconButton
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      size={size}
      variant="outline"
      colorScheme="white"
      borderColor="white"
      color="white"
      _hover={{ bg: "white", color: "blue.600" }}
    >
      {isDark ? '☀️' : '🌙'}
    </IconButton>
  );
};

export default ThemeToggle;
