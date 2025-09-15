import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './store.ts';
import App from './App';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import { ThemeProvider } from './contexts/ThemeContext';

// Define a custom theme for Chakra UI
const theme = extendTheme({
    colors: {
        brand: {
            500: '#2B6CB0',
            600: '#2C5282',
        },
    },
    fonts: {
        heading: `'Inter', sans-serif`,
        body: `'Inter', sans-serif`,
    },
});

const root = createRoot(document.getElementById('root')!);
root.render(
    <StrictMode>
        <ThemeProvider>
            <ChakraProvider theme={theme}>
                <Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>
            </ChakraProvider>
        </ThemeProvider>
    </StrictMode>
);
