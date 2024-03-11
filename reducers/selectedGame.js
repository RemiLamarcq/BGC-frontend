import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null
};

export const selectedGameSlice = createSlice({
  name: 'selectedGame',
  initialState,
  reducers: {
    setSelectedGame: (state, action) => {
      state.value = action.payload
    },
  },
});

export const { setSelectedGame } = selectedGameSlice.actions;
export default selectedGameSlice.reducer;