import AsyncStorage from '@react-native-async-storage/async-storage';

export const addTimer = (timer) => async (dispatch) => {
  dispatch({ type: 'ADD_TIMER', payload: timer });
  const timers = await AsyncStorage.getItem('timers');
  if (timers) {
    const updatedTimers = JSON.parse(timers);
    updatedTimers.push(timer);
    AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
  } else {
    AsyncStorage.setItem('timers', JSON.stringify([timer]));
  }
};

export const removeTimer = (key) => async (dispatch) => {
  dispatch({ type: 'REMOVE_TIMER', payload: key });
  const timers = await AsyncStorage.getItem('timers');
  if (timers) {
    const updatedTimers = JSON.parse(timers).filter((timer) => timer.key !== key);
    AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
  }
};

export const updateTimer = (timer) => ({ type: 'UPDATE_TIMER', payload: timer });
// Ajoutez d'autres actions au besoin
