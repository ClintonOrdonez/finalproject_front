import React from "react";
import { connect } from "react-redux";
import { UserSignup, CheckEmail } from "../actions/actions";

// This was to test whether the page would display and properly navigate
// const Signup = props => (
//   <div>
//     <h3 className="cover-heading">Signup</h3>
//     <p className="lead">Signup can be navigated succesfully.</p>
//   </div>
// );

const mapDispatchToProps = dispatch => {
  return {
    onSignup: (email, password) => dispatch(UserSignup(email, password)),
    onCheckEmail: email => dispatch(CheckEmail(email))
  };
};

const Signup = props => {
  // Email input variables
  let email;
  let validEmail = false;
  // Password input variables
  let password;
  let validPassword = false;
  // Confirm Password variables
  let confirmPassword;
  let matchPassword = false;

  return (
    <div>
      <h3>Signup</h3>

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
            let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (emailRegex.test(email.value)) {
              props.onCheckEmail(email.value).then(result => {
                if (result.data.count === 0) {
                  validEmail = true;
                  document.getElementById("email").innerHTML =
                    "Email is valid.";
                } else {
                  validEmail = false;
                  document.getElementById("email").innerHTML =
                    "Email already in use; provide a different email or login.";
                }
              });
            } else {
              validEmail = false;
              document.getElementById("email").innerHTML = "Not a valid email.";
            }
          }}
        />
        <span />
        <span id="email">
          <br />
        </span>
      </div>

      {/* Password Requirements heading */}
      <div className="form-group">
        <h6>Passwords have the following requirements:</h6>
        <h6 id="requirement1">8 or more characters</h6>
        <h6 id="requirement2">1 uppercase letter</h6>
        <h6 id="requirement3">1 lowercase letter</h6>
        <h6 id="requirement4">1 number OR 1 non-alphanumeric character</h6>
      </div>

      {/* Password input */}
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          ref={p => {
            password = p;
          }}
          onChange={() => {
            // Separate Regex variables to test if password meets minimum requirements
            let hasUpperCase = /[A-Z]/.test(password.value);
            let hasLowerCase = /[a-z]/.test(password.value);
            let hasNumber = /\d/.test(password.value);
            let hasNonAlphaNumeric = /\W/.test(password.value);

            if (password.value.length >= 8) {
              document.getElementById("requirement1").innerHTML =
                "🆗 8 or more characters 🆗";
            } else {
              document.getElementById("requirement1").innerHTML =
                "❌ 8 or more characters ❌";
            }

            if (hasUpperCase === true) {
              document.getElementById("requirement2").innerHTML =
                "🆗 1 uppercase letter 🆗";
            } else {
              document.getElementById("requirement2").innerHTML =
                "❌ 1 uppercase letter ❌";
            }

            if (hasLowerCase === true) {
              document.getElementById("requirement3").innerHTML =
                "🆗 1 lowercase letter 🆗";
            } else {
              document.getElementById("requirement3").innerHTML =
                "❌ 1 lowercase letter ❌";
            }

            if (hasNumber === true || hasNonAlphaNumeric === true) {
              document.getElementById("requirement4").innerHTML =
                "🆗 1 number OR 1 non-alphanumeric character 🆗";
            } else {
              document.getElementById("requirement4").innerHTML =
                "❌ 1 number OR 1 non-alphanumeric character ❌";
            }

            if (
              password.value.length >= 8 &&
              hasUpperCase === true &&
              hasLowerCase === true &&
              (hasNumber === true || hasNonAlphaNumeric === true)
            ) {
              validPassword = true;
            } else {
              validPassword = false;
            }

            if (password.value === confirmPassword.value) {
              matchPassword = true;
              document.getElementById("confirmPassword").innerHTML =
                "Passwords match.";
            } else {
              matchPassword = false;
              document.getElementById("confirmPassword").innerHTML =
                "Passwords do not match.";
            }
          }}
        />
      </div>

      {/* Confirm Password input */}
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Confirm Password"
          ref={cP => {
            confirmPassword = cP;
          }}
          onChange={() => {
            if (password.value === confirmPassword.value) {
              matchPassword = true;
              document.getElementById("confirmPassword").innerHTML =
                "Passwords match.";
            } else {
              matchPassword = false;
              document.getElementById("confirmPassword").innerHTML =
                "Passwords do not match.";
            }
          }}
        />
        <span id="confirmPassword">
          <br />
        </span>
      </div>

      {/* Submit button */}
      <div className="form-group">
        <button
          className="btn btn-secondary"
          onClick={() => {
            if (
              validEmail === true &&
              validPassword === true &&
              matchPassword === true
            ) {
              props.onSignup(email.value, password.value);
              alert("Signup successful; logging in now.");
              props.history.push("/");
            } else {
              document.getElementById("submit").innerHTML =
                "The above requirements have not been met.";
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
)(Signup);
