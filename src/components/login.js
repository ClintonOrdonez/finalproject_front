import React from "react";
import { connect } from "react-redux";
import { UserLogin } from "../actions/actions";

const mapStateToProps = state => {
  return {
    token: state.token,
    email: state.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(UserLogin(email, password))
  };
};

const Login = props => {
  let email;
  let password;

  return (
    <div>
      <h3>Login</h3>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          ref={u => {
            email = u;
          }}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          ref={p => {
            password = p;
          }}
        />
      </div>
      <div className="form-group">
        <button
          className="btn btn-secondary"
          onClick={() => {
            props.onLogin(email.value, password.value);
            props.history.push("/");
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
