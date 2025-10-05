import { useRef, useState, useEffect } from 'react';
import { Box, Button, Input, VStack, Text, HStack, Textarea } from '@chakra-ui/react';
import { usePrevious, useHasChanged } from '@/hooks/usePrevious';

const UseRefExamples = () => {
    // 1. DOM Element Reference
    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    // 2. Mutable Value Storage (doesn't cause re-renders)
    const renderCountRef = useRef(0);
    const previousValueRef = useRef<string>('');
    
    // 3. State for demonstration
    const [inputValue, setInputValue] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    
    // 4. Using custom hooks with useRef
    const previousInputValue = usePrevious(inputValue);
    const inputHasChanged = useHasChanged(inputValue);
    
    // 5. Timer reference
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    
    // Increment render count on every render
    renderCountRef.current += 1;
    
    // Auto-focus input on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    
    // Track previous value
    useEffect(() => {
        previousValueRef.current = inputValue;
    }, [inputValue]);
    
    const handleFocusInput = () => {
        inputRef.current?.focus();
    };
    
    const handleFocusTextarea = () => {
        console.log(textareaRef.current);
        textareaRef.current?.focus();
    };
    
    const handleClearInputs = () => {
        setInputValue('');
        setTextareaValue('');
        inputRef.current?.focus();
    };
    
    const handleShowMessage = () => {
        setShowMessage(true);
        // Clear message after 3 seconds using useRef timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };
    
    const handleScrollToTextarea = () => {
        textareaRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return (
        <Box p={6} borderWidth="1px" borderRadius="md" mb={4}>
            <VStack spacing={6} align="stretch">
                <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                    useRef Examples & Benefits
                </Text>
                
                {/* Render count display */}
                <Box p={3} bg="gray.100" borderRadius="md">
                    <Text fontSize="sm">
                        Component has rendered {renderCountRef.current} times
                        {inputHasChanged && ' (Input value changed!)'}
                    </Text>
                </Box>
                
                {/* Previous value tracking */}
                {previousInputValue && (
                    <Box p={3} bg="yellow.100" borderRadius="md">
                        <Text fontSize="sm">
                            Previous input value: "{previousInputValue}"
                        </Text>
                    </Box>
                )}
                
                {/* Message display */}
                {showMessage && (
                    <Box p={3} bg="green.100" borderRadius="md">
                        <Text fontSize="sm" color="green.800">
                            Message will disappear in 3 seconds (managed by useRef timer)
                        </Text>
                    </Box>
                )}
                
                {/* Form controls */}
                <VStack spacing={4} align="stretch">
                    <Box>
                        <Text mb={2} fontWeight="semibold">Input Field (useRef for focus control):</Text>
                        <Input
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type something here..."
                        />
                    </Box>
                    
                    <Box>
                        <Text mb={2} fontWeight="semibold">Textarea (useRef for focus & scroll):</Text>
                        <Textarea
                            ref={textareaRef}
                            value={textareaValue}
                            onChange={(e) => setTextareaValue(e.target.value)}
                            placeholder="Type something here..."
                            rows={3}
                        />
                    </Box>
                    
                    {/* Control buttons */}
                    <HStack spacing={2} wrap="wrap">
                        <Button size="sm" onClick={handleFocusInput}>
                            Focus Input
                        </Button>
                        <Button size="sm" onClick={handleFocusTextarea}>
                            Focus Textarea
                        </Button>
                        <Button size="sm" onClick={handleScrollToTextarea}>
                            Scroll to Textarea
                        </Button>
                        <Button size="sm" onClick={handleClearInputs}>
                            Clear All
                        </Button>
                        <Button size="sm" onClick={handleShowMessage} colorScheme="green">
                            Show Message
                        </Button>
                    </HStack>
                </VStack>
                
                {/* Benefits explanation */}
                <Box p={4} bg="blue.50" borderRadius="md">
                    <Text fontSize="lg" fontWeight="bold" mb={2} color="blue.800">
                        useRef Benefits Demonstrated:
                    </Text>
                    <VStack align="start" spacing={1}>
                        <Text fontSize="sm">• <strong>DOM Access:</strong> Direct focus control without state</Text>
                        <Text fontSize="sm">• <strong>No Re-renders:</strong> Render count doesn't cause re-renders</Text>
                        <Text fontSize="sm">• <strong>Previous Values:</strong> Track values across renders</Text>
                        <Text fontSize="sm">• <strong>Timer Management:</strong> Store timer IDs for cleanup</Text>
                        <Text fontSize="sm">• <strong>Performance:</strong> Avoid unnecessary re-renders</Text>
                        <Text fontSize="sm">• <strong>Scroll Control:</strong> Direct DOM manipulation</Text>
                    </VStack>
                </Box>
            </VStack>
        </Box>
    );
};

export default UseRefExamples;
