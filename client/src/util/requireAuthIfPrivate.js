import React from 'react';
import { connect } from 'react-redux';
import Redirect from 'react-router-dom/Redirect';
import config from '../config/config';

export default function requireAuthIfPrivate(WrappedComponent) {
  if (config.access.public) { return WrappedComponent }

  const mapStateToProps = (state) => ({
    token: state.auth.token,
    user: state.auth.user,
  });

  return connect(mapStateToProps)(
    (props) =>
      (!props.token && <Redirect push={true} to={'/login'} />) || (
        <WrappedComponent {...props} />
      )
  );
}
