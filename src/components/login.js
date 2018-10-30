import React from "react";
import { connect } from "react-redux";
import { CheckEmail, CheckPassword, UserLogin } from "../actions/actions";

const mapDispatchToProps = dispatch => {
  return {
    onCheckEmail: email => dispatch(CheckEmail(email)),
    onCheckPassword: (email, password) =>
      dispatch(CheckPassword(email, password)),
    onLogin: (email, password) => dispatch(UserLogin(email, password))
  };
};

const Login = props => {
  let email;
  let validEmail = false;
  let password;
  let validPassword = false;

  return (
    <div>
      <h3>Login</h3>

      {/* Email input */}
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          ref={e => {
            email = e;
          }}
          onChange={() => {
            props.onCheckEmail(email.value).then(result => {
              if (result.data.count === 1) {
                validEmail = true;
                // console.log("email: " + validEmail);
              } else {
                validEmail = false;
                // console.log("email: " + validEmail);
                validPassword = false;
                document.getElementById("password").value = "";
              }
            });
          }}
        />
      </div>

      {/* Password input */}
      <div className="form-group">
        <input
          id="password"
          type="password"
          className="form-control"
          placeholder="Password"
          ref={p => {
            password = p;
          }}
          onChange={() => {
            if (validEmail === true) {
              props
                .onCheckPassword(email.value, password.value)
                .then(result => {
                  validPassword = result.data;
                });
            } else {
              validPassword = false;
            }
            // console.log("password: " + validPassword);
          }}
        />
      </div>

      {/* Submit button */}
      <div className="form-group">
        <button
          className="btn btn-secondary"
          // onMouseOver={() => {
          //   console.log("email: " + validEmail);
          //   console.log("password: " + validPassword);
          // }}
          onClick={() => {
            // If both email and password are valid, submit data to login
            if (validEmail === true && validPassword === true) {
              // alert("Logging in now.");
              props.onLogin(email.value, password.value);
              props.history.push("/");
            } else {
              document.getElementById("submit").innerHTML =
                "Invalid email and/or password.";
            }
          }}
        >
          Submit
        </button>
        <br />
        <span id="submit">
          <br />
        </span>
      </div>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
