// Action types
const TOGGLE_DARKMODE = 'toggle_darkmode';

// Actions
export function toggleDarkMode() {
  return {
    type: TOGGLE_DARKMODE,
  };
}

// State
const initialState = {
  darkMode: false,
};

// Reducer
export default function accountPrefsReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DARKMODE:
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
}
