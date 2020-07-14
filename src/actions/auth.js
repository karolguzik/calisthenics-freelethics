import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  DELETE_ACCOUNT,
  CONFIRM_INITIALIZE_ACCOUNT,
  FINISH_INITIALIZE_ACCOUNT,
  CLEAR_TRAININGS_STORE,
} from './types';
import { showAlert } from './alert';
import { clearTrainingsStore } from './training';
import axios from 'axios';
import setAuthToken from '../setAuthToken/setAuthToken';

export const register = (email, username, password, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };

    const body = JSON.stringify({ email, username, password });

    const res = await axios.post('/api/users/registration', body, config);

    
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    

    setTimeout(() => {
      dispatch({type: CONFIRM_INITIALIZE_ACCOUNT});
    }, 4000);

    setTimeout(() => {
      dispatch({ type: FINISH_INITIALIZE_ACCOUNT });
      history.push('/login');
    }, 5000);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(showAlert(error.msg, 'failure')));
    }

    dispatch({
      type: REGISTER_FAILURE,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };

    const body = JSON.stringify({ email, password });

    const res = await axios.post('/api/users/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(authUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(showAlert(error.msg, 'failure')));
    }

    dispatch({
      type: LOGIN_FAILURE,
    });
  }
};

export const authUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_FAILURE,
    });
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT_USER
  });

  dispatch({
    type: CLEAR_TRAININGS_STORE,
  })
}


export const deleteAccount = () => async dispatch => {
  try {
    await axios.delete('/api/users');

    dispatch({
      type: DELETE_ACCOUNT
    })
    
    dispatch({
      type: CLEAR_TRAININGS_STORE,
    })

    dispatch(showAlert('Account deleted', 'success'));
  } catch (error) {
    console.log(error);
  }
}