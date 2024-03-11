import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        isModalVisible: false,
        gamePlay: null,
    }
}

export const ficheGamePlaySlice = createSlice({
    name: 'ficheGamePlay',
    initialState,
    reducers: {
        toggleVisibility: state => {
            state.value.isModalVisible = !state.value.isModalVisible;
        },
        setGamePlayData: (state, action) => {
            state.value.gamePlay = {...action.payload};
        },
        resetFicheGamePlay: state => {
            state.value.isModalVisible = initialState.value.isModalVisible;
            state.value.gamePlay = initialState.value.gamePlay;
        }        
    },
});

export const { toggleVisibility, setGamePlayData, resetFicheGamePlay } = ficheGamePlaySlice.actions;
export default ficheGamePlaySlice.reducer;