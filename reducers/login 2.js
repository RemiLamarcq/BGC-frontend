import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'Signin'
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    returnLogin: (state, action) => {
      state.value = action.payload
    },
  },
});

export const { returnLogin } = loginSlice.actions;
export default loginSlice.reducer;
