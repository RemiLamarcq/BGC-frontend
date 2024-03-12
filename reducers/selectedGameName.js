import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null
};

export const selectedGameNameSlice = createSlice({
  name: 'selectedGameName',
  initialState,
  reducers: {
    setSelectedGameName: (state, action) => {
      state.value = action.payload
    },
  },
});

export const { setSelectedGameName } = selectedGameNameSlice.actions;
export default selectedGameNameSlice.reducer;