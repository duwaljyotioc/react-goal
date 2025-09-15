import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define theme types
export type Theme = 'light' | 'dark';

// Define theme colors
export interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

// Define theme interface
export interface ThemeConfig {
  name: Theme;
  colors: ThemeColors;
}

// Define light theme
const lightTheme: ThemeConfig = {
  name: 'light',
  colors: {
    background: '#ffffff',
    surface: '#f8f9fa',
    primary: '#2B6CB0',
    secondary: '#4A5568',
    text: '#1a202c',
    textSecondary: '#4a5568',
    border: '#e2e8f0',
    success: '#38a169',
    warning: '#d69e2e',
    error: '#e53e3e',
  },
};

// Define dark theme
const darkTheme: ThemeConfig = {
  name: 'dark',
  colors: {
    background: '#0d1117',
    surface: '#161b22',
    primary: '#58a6ff',
    secondary: '#8b949e',
    text: '#f0f6fc',
    textSecondary: '#8b949e',
    border: '#30363d',
    success: '#3fb950',
    warning: '#d29922',
    error: '#f85149',
  },
};

// Theme context type
interface ThemeContextType {
  theme: ThemeConfig;
  themeName: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode;
}

// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<Theme>(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'light';
  });

  // Get current theme config
  const theme = themeName === 'light' ? lightTheme : darkTheme;

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = themeName === 'light' ? 'dark' : 'light';
    setThemeName(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Set specific theme function
  const setTheme = (newTheme: Theme) => {
    setThemeName(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Apply theme to document body
  useEffect(() => {
    document.body.style.backgroundColor = theme.colors.background;
    document.body.style.color = theme.colors.text;
    
    // Set data-theme attribute for CSS variable support
    document.documentElement.setAttribute('data-theme', themeName);
    
    // Set CSS custom properties for easy access
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [theme, themeName]);

  const value: ThemeContextType = {
    theme,
    themeName,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Export theme configs for external use
export { lightTheme, darkTheme };
