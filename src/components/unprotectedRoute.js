import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    authenticated: state.token
  };
};

const UnprotectedRoute = ({ component: Component, authenticated, ...rest }) => {
  // console.log(authenticated);
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === null ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default connect(mapStateToProps)(UnprotectedRoute);
