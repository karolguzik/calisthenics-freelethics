import {
  DONE_TRAINING,
  GET_DONE_TRAININGS,
  CLEAR_PROGRESS_STORE,
} from '../actions/types';

const initialState = {
  doneTrainings: [],
  points: 0,
};

const progress = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case DONE_TRAINING:
      return {
        ...state,
        doneTrainings: [payload, ...state.doneTrainings],
      };
    case GET_DONE_TRAININGS:
      return {
        ...state,
        doneTrainings: payload.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        ),
      };
    case CLEAR_PROGRESS_STORE:
      return {
        doneTrainings: [],
        totalPoints: 0,
      };
    default:
      return state;
  }
};

export default progress;
