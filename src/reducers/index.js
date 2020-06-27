import { DELETE_TRAINING } from '../actions';

const initialState = {
  trainings: [
    {
      id: 1,
      title: 'Full Body Workout',
      repsNumber: 4,
      repsRestTime: 120,
      exerciseRestTime: 30,
      exercises: [
        {
          name: 'push ups',
          time: 30,
        },
        {
          name: 'pull ups',
          time: 45,
        },
        {
          name: 'burpees',
          time: 30,
        },
        {
          name: 'sprawls',
          time: 60,
        },
        {
          name: 'knee jumps',
          time: 60,
        },
      ],
    },
    {
      id: 2,
      title: 'Cardio',
      repsNumber: 5,
      repsRestTime: 90,
      exerciseRestTime: 30,
      exercises: [
        {
          name: 'jumps',
          time: 45,
        },
        {
          name: 'planks',
          time: 60,
        },
        {
          name: 'dips',
          time: 60,
        },
        {
          name: 'running',
          time: 60,
        },
        {
          name: 'squats',
          time: 45,
        },
      ],
    },
  ],
  myTrainings: [],
  doneTrainings: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_TRAINING:
      return {
        ...state,
        trainings: [
          ...state.trainings.filter(
            (training) => training.id !== action.payload
          ),
        ],
      };
    default: 
      return state;
  }
};

export default rootReducer;
