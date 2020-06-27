export const CREATE_TRAINING = 'CREATE_TRAINING';
export const DELETE_TRAINING = 'DELETE_TRAINING';

export const deleteTraining = (id) => {
  return {
    type: DELETE_TRAINING,
    payload: id,
  }
};



