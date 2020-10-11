import React from 'react';
import { GoogleLogin } from 'react-google-login';
import config from '../../config/config';

export default function Login({ onSuccess, token, onError }) {
  return (
    <GoogleLogin
      clientId={config.access.google.clientId}
      buttonText={'Login'}
      onSuccess={onSuccess}
      onFailure={onError}
      cookiePolicy={'single_host_origin'}
      style={{ marginTop: '100px' }}
      isSignedIn={!!token}
    />
  );
}
