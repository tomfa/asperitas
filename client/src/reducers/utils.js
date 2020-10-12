import jwtDecode from 'jwt-decode';
import config from '../config/config';

export const loadAuthFromLocalStorage = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return {};
  }
  const tokenContent = jwtDecode(token);
  const isGoogle = tokenContent.iss && tokenContent.iss.includes('google.com');
  const usingGoogleAuth = !!config.access.google.clientId;
  if (isGoogle && !usingGoogleAuth) {
    return {}
  }
  if (!isGoogle && usingGoogleAuth) {
    return {}
  }
  if (isGoogle) {
    const user = { id: tokenContent.sub, username:tokenContent.name };
    return {user, token}
  }
  return {
    user: tokenContent.user,
    token,
  }
}
