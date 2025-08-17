import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define the state type
interface CounterState {
    value: number;
}

// Create a slice for counter with initial state and reducers
const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0 } as CounterState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
});

// Export actions for use in components
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Export the reducer for the store
export default counterSlice.reducer;
