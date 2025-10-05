import { useRef, useEffect } from 'react';

/**
 * Custom hook to track the previous value of a variable
 * Uses useRef to persist the value across re-renders without causing re-renders
 */
export const usePrevious = <T>(value: T): T | undefined => {
    const ref = useRef<T>();
    
    useEffect(() => {
        ref.current = value;
    });
    
    return ref.current;
};

/**
 * Custom hook to track if a value has changed
 * Useful for detecting changes without causing re-renders
 */
export const useHasChanged = <T>(value: T): boolean => {
    const prevValue = usePrevious(value);
    return prevValue !== undefined && prevValue !== value;
};
