import { useState, useRef, useEffect } from 'react';
import { Box, Button, Text, VStack, HStack } from '@chakra-ui/react';

const TimerComponent = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    
    // useRef to store interval ID - doesn't cause re-renders when changed
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    
    // useRef to track if component is mounted (prevents memory leaks)
    const isMountedRef = useRef(true);

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
            // Cleanup interval on unmount
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
            intervalRef.current = setInterval(() => {
                if (isMountedRef.current) {
                    setTime(prevTime => prevTime + 1);
                }
            }, 1000);
        }
    };

    const stopTimer = () => {
        setIsRunning(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const resetTimer = () => {
        stopTimer();
        setTime(0);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <Box p={4} borderWidth="1px" borderRadius="md" mb={4}>
            <VStack spacing={4}>
                <Text fontSize="2xl" fontWeight="bold">
                    Timer: {formatTime(time)}
                </Text>
                <HStack spacing={2}>
                    <Button 
                        colorScheme="green" 
                        onClick={startTimer}
                        isDisabled={isRunning}
                    >
                        Start
                    </Button>
                    <Button 
                        colorScheme="red" 
                        onClick={stopTimer}
                        isDisabled={!isRunning}
                    >
                        Stop
                    </Button>
                    <Button 
                        colorScheme="gray" 
                        onClick={resetTimer}
                    >
                        Reset
                    </Button>
                </HStack>
                <Text fontSize="sm" color="gray.600">
                    Status: {isRunning ? 'Running' : 'Stopped'}
                </Text>
            </VStack>
        </Box>
    );
};

export default TimerComponent;
