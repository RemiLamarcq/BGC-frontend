import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false
};

export const addGamePlayVisibleSlice = createSlice({
  name: 'addGamePlayVisible',
  initialState,
  reducers: {
    setAddGamePlayVisible: (state, action) => {
      state.value = action.payload
    },
  },
});

export const { setAddGamePlayVisible } = addGamePlayVisibleSlice.actions;
export default addGamePlayVisibleSlice.reducer;