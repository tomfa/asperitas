import { LOGIN_SUCCESS, SIGNUP_SUCCESS, GOOGLE_LOGIN_SUCCESS, LOGOUT } from '../actions/auth';

export default () => next => action => {
  if (action.type === LOGIN_SUCCESS || action.type === SIGNUP_SUCCESS || action.type === GOOGLE_LOGIN_SUCCESS) {
    localStorage.setItem('token', action.token);
  } else if (action.type === LOGOUT) {
    localStorage.removeItem('token');
  }
  next(action);
};
