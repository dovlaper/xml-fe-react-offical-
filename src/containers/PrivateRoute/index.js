import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsAuthenticated } from '../App/selectors';

export function PrivateRoute({
  component: Component,
  isAuthenticated,
  canAccess = true,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        (isAuthenticated && canAccess) ? <Component {...props} /> : <Redirect from={rest.path} to="/" />
      }
    />
  );
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated()
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(PrivateRoute);
