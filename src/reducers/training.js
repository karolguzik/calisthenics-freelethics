import { CREATE_TRAINING, DELETE_TRAINING, GET_TRAININGS, GET_TRAINING, TRAINING_ERROR } from '../actions/types';

const initialState = {
  trainings: [
    {
      "exercises": [
        {
          "exerciseName": "push ups",
          "exerciseTime": "60",
          "exerciseId": "713c0863-469f-4847-86a6-4572b7272483"
        },
        {
          "exerciseName": "pull ups",
          "exerciseTime": "60",
          "exerciseId": "713c0863-469f-4847-86a6-4572b7272444"
        },
        {
          "exerciseName": "dips",
          "exerciseTime": "60",
          "exerciseId": "713c0863-469f-4847-86a6-4572b7222583"
        },
        {
          "exerciseName": "squats",
          "exerciseTime": "60",
          "exerciseId": "713c0863-469f-4847-86a6-4442b7272483"
        },
        {
          "exerciseName": "burbees",
          "exerciseTime": "60",
          "exerciseId": "713c0863-469f-4847-86a6-4572b7271242"
        },
        {
          "exerciseName": "stomach",
          "exerciseTime": "60",
          "exerciseId": "713c0863-469f-4847-86a6-4572b7272347"
        }
      ],
      "_id": "5f064e2ae4f60d1f84c2d7ef",
      "name": "Full Body Workout",
      "reps": 5,
      "repsRestTime": 60,
      "exerciseRestTime": 30,
      "totalTime": 100,
      "__v": 0
    },
    {
      "exercises": [
        {
          "exerciseName": "jumps",
          "exerciseTime": "60",
          "exerciseId": "713c0863-469f-4847-86a6-4527248372b7"
        },
        {
          "exerciseName": "burbees",
          "exerciseTime": "60",
          "exerciseId": "713c0863-469f-4847-86a6-457442b72724"
        },
        {
          "exerciseName": "starjumps",
          "exerciseTime": "60",
          "exerciseId": "713c0863-469f-4847-86a6-4572b713c086"
        },
        {
          "exerciseName": "squats",
          "exerciseTime": "60",
          "exerciseId": "713c0863-469f-4847-86a6-4442b7272483"
        },
        {
          "exerciseName": "push up's",
          "exerciseTime": "60",
          "exerciseId": "713c0863-469f-4847-4847-4572b7271242"
        },
        {
          "exerciseName": "stomach",
          "exerciseTime": "60",
          "exerciseId": "713c0863-469f-4847-86a6-4572b7242423"
        },
        {
          "exerciseName": "squats + jumps",
          "exerciseTime": "60",
          "exerciseId": "713c0863-469f-4847-86a6-4572b72713c7"
        },
      ],
      "_id": "5f064e2ae4f60d1f84c2dfe7",
      "name": "Cardio",
      "reps": 4,
      "repsRestTime": 120,
      "exerciseRestTime": 30,
      "totalTime": 120,
      "__v": 0
    }
  ],
  myTrainings: [],
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
        myTrainings: [payload, ...state.myTrainings]
      };
    case DELETE_TRAINING:
      return {
        ...state,
        trainings: state.trainings.filter(training => training._id !== payload),
        myTrainings: state.myTrainings.filter(training => training._id !== payload),
      }
    case GET_TRAININGS:
      return {
        ...state,
        myTrainings: payload
      }
    case GET_TRAINING: 
      return {
        ...state,
        activeTraining: payload,
      }
      case TRAINING_ERROR:
        return {
          ...state,
          error: payload,
        }
    default:
      return state;
  }
};



export default training;
