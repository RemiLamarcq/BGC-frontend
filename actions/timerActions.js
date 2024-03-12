
export const startTimer = (id, type) => ({
  type: 'START_TIMER',
  payload: { id, type },
});

export const stopTimer = (id) => ({
  type: 'STOP_TIMER',
  payload: { id },
});