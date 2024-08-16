import { createSlice } from '@reduxjs/toolkit';

// Create a slice of the Redux state with its name, initial state, and reducers
const audioPlayerSlice = createSlice({
  name: 'audioPlayer', // Name of the slice
  initialState: {
    currentSong: null, // Initial state for the current song
  },
  // Reducer to set the current song in state
  reducers: {
    setCurrentSong(state, action) {
      state.currentSong = action.payload;
    },
  },
});

export const { setCurrentSong } = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;