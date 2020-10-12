import jwtDecode from 'jwt-decode';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGOUT
} from '../actions/auth';
import { loadAuthFromLocalStorage } from './utils';

const { token, user } = loadAuthFromLocalStorage();

const initialState = {
  ...(token && { token }),
  ...(user && { user })
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      const user = jwtDecode(action.token).user;
      return {
        ...state,
        loading: false,
        token: action.token,
        user
      };
    case GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.token,
        user: { username: action.user.name, id: action.user.googleId }
      };
    case GOOGLE_LOGIN_ERROR:
    case SIGNUP_ERROR:
    case LOGIN_ERROR:
      return { ...state, loading: false };

    case LOGOUT:
      return { ...state, token: null, user: null };

    default:
      return state;
  }
};
