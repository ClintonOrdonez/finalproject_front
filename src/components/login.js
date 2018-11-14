import React from "react";
import { connect } from "react-redux";
import {
  UserCheckEmail,
  UserCheckPassword,
  UserLogin
} from "../actions/userActions";

const mapDispatchToProps = dispatch => {
  return {
    onCheckEmail: email => dispatch(UserCheckEmail(email)),
    onCheckPassword: (email, password) =>
      dispatch(UserCheckPassword(email, password)),
    onLogin: (email, password) => dispatch(UserLogin(email, password))
  };
};

const Login = props => {
  let emailRaw;
  let email;
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let validEmail = false;
  let password;
  let validPassword = false;

  return (
    <div>
      {/* "Login" header */}
      <div className="form-group">
        <h3>Login</h3>
      </div>

      {/* "Email" input */}
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          ref={eR => {
            emailRaw = eR;
          }}
          onChange={() => {
            email = emailRaw.value.toLowerCase();

            if (emailRegex.test(email) === true) {
              props.onCheckEmail(email).then(result => {
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
            } else {
              validEmail = false;
            }
          }}
        />
      </div>

      {/* "Password" input */}
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
            if (emailRegex.test(email) === true) {
              props.onCheckEmail(email).then(result => {
                if (result.data.count === 1) {
                  props.onCheckPassword(email, password.value).then(result => {
                    validPassword = result.data;
                  });
                }
              });
            }
            // console.log("password: " + validPassword);
          }}
        />
      </div>

      {/* "Submit" button */}
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
              props.onLogin(email, password.value);
              props.history.push("/");
            } else {
              document.getElementById("submitSpan").innerHTML =
                "Invalid email and/or password.";
              document.getElementById("resetPassword").innerHTML =
                "<b>Forgotten password?</b>";
            }
          }}
        >
          Submit
        </button>
        <br />
        <span id="submitSpan">&nbsp;</span>
        <br />
        <a id="resetPassword" href="/resetPassword">
          <b />
        </a>
      </div>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
