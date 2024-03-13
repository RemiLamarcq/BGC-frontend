import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: true,
}

export const cameraPermissionSlice = createSlice({
    name: 'cameraPermission',
    initialState,
    reducers: {
        setCameraPermission: (state, action) => {
            state.value = action.payload;
        },
    }
});

export const { setCameraPermission } = cameraPermissionSlice.actions;
export default cameraPermissionSlice.reducer;