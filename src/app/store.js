/**
 * REDUX STORE CONFIGURATION
 * Central state management for the entire app
 * Uses RTK Query for API calls
 */
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    // Add the RTK Query reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Add the RTK Query middleware (enables caching, invalidation, polling)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});