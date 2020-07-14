import { CREATE_TRAINING, DELETE_TRAINING, GET_TRAININGS, GET_TRAINING, TRAINING_ERROR, CLEAR_TRAININGS_STORE, DONE_TRAINING, GET_DONE_TRAININGS } from '../actions/types';

const initialState = {
  trainings: [],
  // myTrainings: [],
  doneTrainings: [],
  activeTraining: null,
  error: {}
};

const training = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case CREATE_TRAINING:
      return {
        ...state,
        trainings: [payload, ...state.trainings]
      };
    case DELETE_TRAINING:
      return {
        ...state,
        trainings: state.trainings.filter(training => training._id !== payload),
        // myTrainings: state.myTrainings.filter(training => training._id !== payload),
      }
    case GET_TRAININGS:
      return {
        ...state,
        trainings: payload.sort((a,b) => new Date(b.date) - new Date(a.date))
      }
    case GET_TRAINING: 
      return {
        ...state,
        activeTraining: payload,
      }
    case DONE_TRAINING:
      return {
        ...state,
        doneTrainings: [payload, ...state.doneTrainings]
      }
    case GET_DONE_TRAININGS:
      return {
        ...state,
        doneTrainings: payload.sort((a,b) => new Date(b.date) - new Date(a.date))
      }
    case TRAINING_ERROR:
      return {
        ...state,
        error: payload
        }
    case CLEAR_TRAININGS_STORE: 
      return {
        trainings: [],
        // trainings: state.trainings,
        // myTrainings: [],
        doneTrainings: [],
        activeTraining: null,
        error: {}
      }
    default:
      return state;
  }
};



export default training;
