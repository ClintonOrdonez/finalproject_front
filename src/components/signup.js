import React from "react";
import { connect } from "react-redux";
import { CheckEmail, UserSignup } from "../actions/actions";

const mapDispatchToProps = dispatch => {
  return {
    onCheckEmail: email => dispatch(CheckEmail(email)),
    onSignup: (email, password) => dispatch(UserSignup(email, password))
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
                    "Email already in use; provide a different email or login to existing account.";
                }
              });
            } else {
              validEmail = false;
              document.getElementById("email").innerHTML = "Not a valid email.";
            }
          }}
        />
        <span id="email">
          <br />
        </span>
      </div>

      {/* Password Requirements table */}
      <div className="form-group">
        <h6>Passwords have the following requirements:</h6>
        <table align="center">
          <tr>
            <td>
              <span id="requirement1" role="img" aria-label="1">
                1️⃣&nbsp;
              </span>
            </td>
            <td align="left">8 or more characters</td>
          </tr>
          <tr>
            <td>
              <span id="requirement2" role="img" aria-label="2">
                2️⃣&nbsp;
              </span>
            </td>
            <td align="left">1 uppercase letter</td>
          </tr>
          <tr>
            <td>
              <span id="requirement3" role="img" aria-label="3">
                3️⃣&nbsp;
              </span>
            </td>
            <td align="left">1 lowercase letter</td>
          </tr>
          <tr>
            <td>
              <span id="requirement4" role="img" aria-label="4">
                4️⃣&nbsp;
              </span>
            </td>
            <td align="left">1 number OR 1 non-alphanumeric character</td>
          </tr>
        </table>
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
              document.getElementById("requirement1").innerHTML = "✅&nbsp;";
            } else {
              document.getElementById("requirement1").innerHTML = "🔴&nbsp;";
            }

            if (hasUpperCase === true) {
              document.getElementById("requirement2").innerHTML = "✅&nbsp;";
            } else {
              document.getElementById("requirement2").innerHTML = "🔴&nbsp;";
            }

            if (hasLowerCase === true) {
              document.getElementById("requirement3").innerHTML = "✅&nbsp;";
            } else {
              document.getElementById("requirement3").innerHTML = "🔴&nbsp;";
            }

            if (hasNumber === true || hasNonAlphaNumeric === true) {
              document.getElementById("requirement4").innerHTML = "✅&nbsp;";
            } else {
              document.getElementById("requirement4").innerHTML = "🔴&nbsp;";
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
                "Please satisfy all the above fields.";
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
