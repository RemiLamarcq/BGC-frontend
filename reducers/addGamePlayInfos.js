import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    selectedGameName: null,
    isInterrupted: false,
    date: {
        startDate: '',
        endDate: '',
    },
    location: '',
    players: [],
    selectedPhoto: 0,
    photosUri: [],
    comment: '',
  },
};

export const addGamePlayInfosSlice = createSlice({
  name: 'addGamePlayInfos',
  initialState,
  reducers: {
    setSelectedGameName: (state, action) => {
      state.value.selectedGameName = action.payload;
    },
    toggleIsInterrupted: state => {
        state.value.isInterrupted = !state.value.isInterrupted;
    },
    setStartDate: (state, action) => {
        state.value.date.startDate = action.payload;
    },
    setEndDate: (state, action) => {
        state.value.date.endDate = action.payload;
    },
    setLocation: (state, action) => {
        state.value.location = action.payload;
    },
    setNewPlayer: (state, action) => {
        state.value.players.push(action.payload);
    },
    removePlayer: (state, action) => {
        state.value.players.splice(action.payload, 1);
    },
    toggleIsWinner: (state, action) => {
        state.value.players[action.payload].isWinner = !state.value.players[action.payload].isWinner;
    },
    setTeam: (state, action) => {
        state.value.players[action.payload.index].team = action.payload.team;
    },
    setCharacter: (state, action) => {
        state.value.players[action.payload.index].character = action.payload.character;
    },
    setScore: (state, action) => {
        state.value.players[action.payload.index].score = action.payload.score;
    },
    resetPlayersInfos: state => {
        state.value.players.forEach(player => {
            player.isWinner = false;
            player.team = '';
            player.character = '';
            player.score = '';
        })
    },
    setPhoto: (state, action) => {
        state.value.photosUri[action.payload.selectedPhoto] = action.payload.uri;
    },
    setSelectedPhoto: (state, action) => {
        state.value.selectedPhoto = action.payload;
    },
    setComment: (state, action) => {
        state.value.comment = action.payload;
    },
  },
});

export const {
    setSelectedGameName,
    toggleIsInterrupted,
    setStartDate,
    setEndDate,
    setLocation,
    setNewPlayer,
    removePlayer,
    toggleIsWinner,
    setTeam,
    setCharacter,
    setScore,
    resetPlayersInfos,
    setPhoto,
    setSelectedPhoto,
    setComment,
} = addGamePlayInfosSlice.actions;

export default addGamePlayInfosSlice.reducer;