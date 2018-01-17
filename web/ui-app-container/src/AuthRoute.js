import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const isAuthenticated = () => {
  return window.localStorage.getItem('token') ? true : false;
};

const PRIVATE_ROOT = '/prd/dashboard';
const PUBLIC_ROOT = '/';

const AuthRoute = ({ component, ...props }) => {
  const { isPrivate } = component;

  if (isAuthenticated()) {
    // is public
    if (isPrivate === undefined || isPrivate === false) {
      return <Route {...props} component={component} />;
    }
  } else {
    // is public
    if (isPrivate === undefined) {
      return <Redirect to={PUBLIC_ROOT + localStorage.getItem('tenantId') || 'default'} />;
    } else {
      return <Route {...props} component={component} />;
    }
  }
};

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

export default AuthRoute;
