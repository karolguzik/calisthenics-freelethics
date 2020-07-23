import {
  GET_TRAINING_STATISTICS,
  GET_USER_INFO,
  CLEAR_STATISTICS_STORE,
} from './types'; 
import axios from 'axios';


export const getStatistics = () => async (dispatch) => {
  try {
    const progress = await axios.get('/api/progress');
    const user = await axios.get('/api/auth');

    dispatch({
      type: GET_USER_INFO,
      payload: user.data
    })

    if(progress.data.length > 0) {
      dispatch({
        type: GET_TRAINING_STATISTICS,
        payload: progress.data,
      });
    }
  } catch (err) {
      throw err;
  }
};

export const clearStatisticsStore = () => (dispatch) => {
  dispatch({
    type: CLEAR_STATISTICS_STORE,
  })
};
