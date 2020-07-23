import { SHOW_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

const alert = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SHOW_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return [];
    default:
      return state;
  }
}

export default alert;