import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  timers: [],
};

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TIMER':
      const updatedTimersAdd = [...state.timers, action.payload];
      AsyncStorage.setItem('timers', JSON.stringify(updatedTimersAdd));
      return {
        ...state,
        timers: updatedTimersAdd,
      };
    case 'REMOVE_TIMER':
      const updatedTimersRemove = state.timers.filter((timer) => timer.key !== action.payload);
      AsyncStorage.setItem('timers', JSON.stringify(updatedTimersRemove));
      return {
        ...state,
        timers: updatedTimersRemove,
      };
    case 'UPDATE_TIMER':
      // Ajoutez ici la logique pour mettre à jour un minuteur/chronomètre si nécessaire
      return state;
    default:
      return state;
  }
};

export default timerReducer;
