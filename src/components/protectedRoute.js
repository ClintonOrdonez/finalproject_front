import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    authenticated: state.token
  };
};

const ProtectedRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated !== null ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default connect(mapStateToProps)(ProtectedRoute);
