import { CREATE_TRAINING, DELETE_TRAINING, GET_TRAININGS, GET_TRAINING, TRAINING_ERROR} from './types';
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

    history.push('/mytrainings');
  } catch (err) {
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

    dispatch(showAlert('Training deleted'));
    history.push('/mytrainings');
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
    dispatch({
      type: TRAINING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
}