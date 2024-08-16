import { configureStore } from '@reduxjs/toolkit';
import audioPlayerReducer from './audioPlayerSlice';

// Configure the store with the audioPlayer reducer
const store = configureStore({
  reducer: {
    audioPlayer: audioPlayerReducer, // attach the audioPlayer slice to the store
  },
});

export default store;