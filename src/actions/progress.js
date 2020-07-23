import {
  CLEAR_PROGRESS_STORE,
  DONE_TRAINING,
  GET_DONE_TRAININGS,
} from './types';
import axios from 'axios';

export const doneTraining = (training) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'Application/json',
      },
    };

    const body = JSON.stringify(training);

    const res = await axios.post('/api/progress', body, config);

    dispatch({
      type: DONE_TRAINING,
      payload: res.data,
    });
  } catch (err) {
      throw err;
  }
};

export const getDoneTrainings = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/progress');

    dispatch({
      type: GET_DONE_TRAININGS,
      payload: res.data,
    });
  } catch (err) {
    throw err;
  }
};

export const clearProgressStore = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROGRESS_STORE,
  });
};
