import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice.ts';
import projectsReducer from './store/projectSlice.ts';

// 1. Logging Middleware
const loggerMiddleware = (store) => (next) => (action) => {
    console.log('Logging: Action dispatched', { type: action.type, payload: action.payload });
    return next(action);
};

// 2. Analytics Middleware
const analyticsMiddleware = (store) => (next) => (action) => {
    // Mock analytics event (replace with real service like GA)
    if (action.type === 'projects/addProject') {
        console.log('Analytics: Project added event', { projectName: action.payload?.name });
        // In production: gtag('event', 'project_added', { name: action.payload.name });
    } else if (action.type.includes('fetchProjects/fulfilled')) {
        console.log('Analytics: Projects loaded', { count: action.payload.length });
    }
    return next(action);
};

// 3. API Middleware (for async thunks)
const apiMiddleware = (store) => (next) => (action) => {
    if (action.type.endsWith('/pending') && action.meta.requestId) {
        console.log('API: Starting request', action.type);
    } else if (action.type.endsWith('/fulfilled')) {
        console.log('API: Request succeeded', action.type);
    } else if (action.type.endsWith('/rejected')) {
        console.log('API: Request failed', action.type, action.error);
        // Optional: Retry logic or global error handling
    }
    return next(action);
};

const store = configureStore({
    reducer: {
        counter: counterReducer,
        projects: projectsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loggerMiddleware, analyticsMiddleware, apiMiddleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
