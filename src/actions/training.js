import { CREATE_TRAINING, DELETE_TRAINING, GET_TRAININGS, GET_TRAINING, TRAINING_ERROR, CLEAR_TRAININGS_STORE, DONE_TRAINING, GET_DONE_TRAININGS} from './types';
import { showAlert } from './alert';
import axios from 'axios';

export const createTraining = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'Application/json'
      }
    }

    const res = await axios.post('/api/trainings', formData, config);

    dispatch({
      type: CREATE_TRAINING,
      payload: res.data,
    })

    dispatch(showAlert('Training created', 'success'));

    history.push('/trainings');
  } catch (err) {
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach(error => dispatch(showAlert(error.msg, 'failure')))
    }

    dispatch({
      type: TRAINING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
}

export const deleteTraining = (id, history) => async dispatch => {
  try {
    await axios.delete(`/api/trainings/${id}`);

    dispatch({
      type: DELETE_TRAINING,
      payload: id
    })

    dispatch(showAlert('Training deleted', 'success'));
    history.push('/trainings');
  } catch (err) {
    dispatch({
      type: TRAINING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
}

export const getTrainings = () => async dispatch => {
  try {
    const res = await axios.get('/api/trainings');

    dispatch({
      type: GET_TRAININGS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: TRAINING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
}

export const getTraining = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/trainings/${id}`);

    dispatch({
      type: GET_TRAINING,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
    // dispatch({
    //   type: TRAINING_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status}
    // })
  }
}

export const clearTrainingsStore = () => dispatch => {
  dispatch({
    type: CLEAR_TRAININGS_STORE,
  })
}

export const doneTraining = (training) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'Application/json'
      }
    }

    // const body = JSON.stringify({ activeTrainingId: id, activeTrainingName: name });

    const res = await axios.post('/api/progress', training, config);

    dispatch({
      type: DONE_TRAINING,
      payload: res.data,
    })

    // dispatch(showAlert('Training done', 'success'));
  } catch (err) {
    dispatch({
      type: TRAINING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
};


export const getDoneTrainings = () => async dispatch => {
  try {
    const res = await axios.get('/api/progress');

    dispatch({
      type: GET_DONE_TRAININGS,
      payload: res.data,
    })
  } catch (err) {
    console.log(err)
    // dispatch({
    //   type: TRAINING_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status}
    // })
  }
}