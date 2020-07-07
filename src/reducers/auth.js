import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  FINISH_INITIALIZE_ACCOUNT,
  // DELETE_ACCOUNT_SUCCESS,
  // DELETE_ACCOUNT_FAILURE,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: null,
  initializeAccount: false,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        initializeAccount: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
    case REGISTER_FAILURE:
    case AUTH_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT_USER:
      localStorage.removeItem('token');
      return {
        token: null,
        isAuthenticated: false,
        user: null,
        initializeAccount: false,
      };
    case FINISH_INITIALIZE_ACCOUNT:
      return {
        ...state,
        initializeAccount: false,
      };
    default:
      return state;
  }
};

export default auth;
