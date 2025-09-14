import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice.ts';
import projectsReducer from './store/projectSlice.ts'

const store = configureStore({
    reducer: {
        counter: counterReducer,
        projects: projectsReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
