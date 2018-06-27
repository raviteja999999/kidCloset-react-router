import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { loginPress, startLogout } from '../actions/auth';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  loginPress: loginPress,
  uid: uid,
  startLogout: startLogout,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) => (
    isAuthenticated ? (
      <div>
        <Header loginPress={loginPress} uid={uid} quiz startLogout={startLogout} />
        <Component {...props} />
      </div>
    ) : (
      <Redirect to="/" />
      )
  )}
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
  uid: state.auth.uid,
});

const mapDispatchToProps = dispatch => {
  return {
    loginPress: () => dispatch(loginPress()),
    startLogout: () => dispatch(startLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
