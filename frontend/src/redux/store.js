import { configureStore } from '@reduxjs/toolkit';
import audioPlayerReducer from './audioPlayerSlice';

// Configure the store with the audioPlayer reducer
const store = configureStore({
  reducer: {
    audioPlayer: audioPlayerReducer, // attach the audioPlayer slice to the store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Configure the serializable check if you have specific cases
        ignoredActions: [], // Add actions that are known to contain non-serializable data
        ignoredPaths: [],   // Add state paths that contain non-serializable data
      },
    }),
});

export default store;