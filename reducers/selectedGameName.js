import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null
};

export const defaultGameNameSlice = createSlice({
  name: 'defaultGameName',
  initialState,
  reducers: {
    setDefaultGameName: (state, action) => {
      state.value = action.payload
    },
  },
});

export const { setDefaultGameName } = defaultGameNameSlice.actions;
export default defaultGameNameSlice.reducer;