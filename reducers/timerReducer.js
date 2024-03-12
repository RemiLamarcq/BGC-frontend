const initialState = {
  // ... autres propriétés
  activeTimers: [],
};

const timerReducer = (state = initialState, action) => {
  // ... votre logique actuelle du reducer

  switch (action.type) {
    case 'START_TIMER':
      return {
        ...state,
        activeTimers: [...state.activeTimers, { id: action.payload.id, type: action.payload.type }],
      };
    case 'STOP_TIMER':
      return {
        ...state,
        activeTimers: state.activeTimers.filter(timer => timer.id !== action.payload.id),
      };
    // ... autres cas d'action
    default:
      return state;
  }
};

export default timerReducer;