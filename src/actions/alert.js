import {
  SHOW_ALERT,
  REMOVE_ALERT
} from './types';
import { v4 as uuidv4 } from 'uuid';

export const showAlert = (msg, alertType, time = 3000) => dispatch => {
  const alertId = uuidv4();

  dispatch({
    type: SHOW_ALERT,
    payload: { msg, alertType, alertId }
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: alertId
    })
  }, time)
}