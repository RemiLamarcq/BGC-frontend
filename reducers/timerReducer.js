const timerReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TIMER':
      return [...state, action.payload];
    case 'REMOVE_TIMER':
      return state.filter(timer => timer.key !== action.payload);
    case 'UPDATE_TIMER':
      return state.map(timer => 
        timer.key === action.payload.key ? { ...timer, ...action.payload.updates } : timer
      );
    case 'UPDATE_TIMER_COUNT':
      return state.map(timer => 
        timer.key === action.payload.key ? { ...timer, count: action.payload.count } : timer
      );
    default:
      return state;
  }
};

export default timerReducer;