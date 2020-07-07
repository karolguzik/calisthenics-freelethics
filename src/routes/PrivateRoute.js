import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => {
  return(
    <Route {...rest} render={props => (
      isAuthenticated ? <Component {...props} /> : <Redirect to='/registration' />
    )}
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(PrivateRoute);