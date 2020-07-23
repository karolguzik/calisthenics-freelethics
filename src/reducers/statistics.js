import { GET_TRAINING_STATISTICS, GET_USER_INFO, CLEAR_STATISTICS_STORE } from '../actions/types';

const initialState = {
  points: 0,
  username: null,
  createdAccountDate: null,
  doneTrainingsNumber: 0,
  lastTraining: '',
};

const statistics = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TRAINING_STATISTICS:
      return {
        ...state,
        points: payload.map((el) => el.totalTime).reduce((a, b) => a + b, 0),
        doneTrainingsNumber: payload.length,
        lastTraining: payload[payload.length - 1].name,
      };
    case GET_USER_INFO:
      return {
        ...state,
        createdAccountDate: payload.date,
        username: payload.username,
      };
    case CLEAR_STATISTICS_STORE:
      return {
        points: 0,
        username: null,
        createdAccountDate: null,
        doneTrainingsNumber: 0,
        lastTraining: '-',
      };
    default:
      return state;
  }
};

export default statistics;
