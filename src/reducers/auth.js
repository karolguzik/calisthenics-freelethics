import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  CONFIRM_INITIALIZE_ACCOUNT,
  FINISH_INITIALIZE_ACCOUNT,
  DELETE_ACCOUNT
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: null,
  initializeAccount: false,
  initializeConfirm: false,
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
    case DELETE_ACCOUNT:
      localStorage.removeItem('token');
      return {
        token: null,
        isAuthenticated: false,
        user: null,
        initializeAccount: false,
      };
    case CONFIRM_INITIALIZE_ACCOUNT:
      return {
        ...state,
        initializeConfirm: true,
      }
    case FINISH_INITIALIZE_ACCOUNT:
      return {
        ...state,
        initializeAccount: false,
        initializeConfirm: false,
      };
    default:
      return state;
  }
};

export default auth;
