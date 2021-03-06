import React from "react";
import { connect } from "react-redux";
import { UserCheckEmail, UserSignup } from "../actions/userActions";

const mapDispatchToProps = dispatch => {
  return {
    onCheckEmail: email => dispatch(UserCheckEmail(email)),
    onSignup: (email, password) => dispatch(UserSignup(email, password))
  };
};

const Signup = props => {
  // Email input variables
  let emailRaw;
  let email;
  // eslint-disable-next-line
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let validEmail = false;
  // Password input variables
  let password;
  let validPassword = false;
  // Confirm Password input variables
  let confirmPassword;
  let matchPassword = false;

  return (
    <div>
      {/* "Signup" header */}
      <div className="form-group">
        <h3>Signup</h3>
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

            if (email !== "") {
              if (emailRegex.test(email) === true) {
                props.onCheckEmail(email).then(result => {
                  if (result.data.count === 0) {
                    validEmail = true;
                    document.getElementById("emailSpan").innerHTML =
                      "Email is a valid format.";
                  } else {
                    validEmail = false;
                    document.getElementById("emailSpan").innerHTML =
                      "Email already in use; provide a different email or login to existing account.";
                  }
                });
              } else {
                validEmail = false;
                document.getElementById("emailSpan").innerHTML =
                  "Email is an invalid format.";
              }
            } else {
              validEmail = false;
              document.getElementById("emailSpan").innerHTML = "&nbsp;";
            }
          }}
        />
        <span id="emailSpan">&nbsp;</span>
      </div>

      {/* "Password requirements" table */}
      <div className="form-group">
        <h6>Password requirements:</h6>
        <table align="center">
          <tbody>
            <tr>
              <td>
                <span id="requirement1Span" role="img" aria-label="1">
                  1️⃣&nbsp;
                </span>
              </td>
              <td align="left">Length of 8 or more characters</td>
            </tr>

            <tr>
              <td>
                <span id="requirement2Span" role="img" aria-label="2">
                  2️⃣&nbsp;
                </span>
              </td>
              <td align="left">At least 1 uppercase letter</td>
            </tr>

            <tr>
              <td>
                <span id="requirement3Span" role="img" aria-label="3">
                  3️⃣&nbsp;
                </span>
              </td>
              <td align="left">At least 1 lowercase letter</td>
            </tr>

            <tr>
              <td>
                <span id="requirement4Span" role="img" aria-label="4">
                  4️⃣&nbsp;
                </span>
              </td>
              <td align="left">
                At least 1 number <i>and</i>/<i>or</i> 1 non-alphanumeric
                character
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* "Password" input */}
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

            if (password.value !== "") {
              if (password.value.length >= 8) {
                document.getElementById("requirement1Span").innerHTML =
                  "✅&nbsp;";
              } else {
                document.getElementById("requirement1Span").innerHTML =
                  "🔴&nbsp;";
              }

              if (hasUpperCase === true) {
                document.getElementById("requirement2Span").innerHTML =
                  "✅&nbsp;";
              } else {
                document.getElementById("requirement2Span").innerHTML =
                  "🔴&nbsp;";
              }

              if (hasLowerCase === true) {
                document.getElementById("requirement3Span").innerHTML =
                  "✅&nbsp;";
              } else {
                document.getElementById("requirement3Span").innerHTML =
                  "🔴&nbsp;";
              }

              if (hasNumber === true || hasNonAlphaNumeric === true) {
                document.getElementById("requirement4Span").innerHTML =
                  "✅&nbsp;";
              } else {
                document.getElementById("requirement4Span").innerHTML =
                  "🔴&nbsp;";
              }
            } else {
              document.getElementById("requirement1Span").innerHTML =
                "1️⃣&nbsp;";
              document.getElementById("requirement2Span").innerHTML =
                "2️⃣&nbsp;";
              document.getElementById("requirement3Span").innerHTML =
                "3️⃣&nbsp;";
              document.getElementById("requirement4Span").innerHTML =
                "4️⃣&nbsp;";
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

            if (password.value !== "" && confirmPassword.value !== "") {
              if (password.value === confirmPassword.value) {
                matchPassword = true;
                document.getElementById("confirmPasswordSpan").innerHTML =
                  "Passwords match.";
              } else {
                matchPassword = false;
                document.getElementById("confirmPasswordSpan").innerHTML =
                  "Passwords do not match.";
              }
            } else {
              matchPassword = false;
              document.getElementById("confirmPasswordSpan").innerHTML =
                "&nbsp;";
            }
          }}
        />
      </div>

      {/* "Confirm Password" input */}
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Confirm Password"
          ref={cP => {
            confirmPassword = cP;
          }}
          onChange={() => {
            if (password.value !== "" && confirmPassword.value !== "") {
              if (password.value === confirmPassword.value) {
                matchPassword = true;
                document.getElementById("confirmPasswordSpan").innerHTML =
                  "Passwords match.";
              } else {
                matchPassword = false;
                document.getElementById("confirmPasswordSpan").innerHTML =
                  "Passwords do not match.";
              }
            } else {
              matchPassword = false;
              document.getElementById("confirmPasswordSpan").innerHTML =
                "&nbsp;";
            }
          }}
        />
        <span id="confirmPasswordSpan">&nbsp;</span>
      </div>

      {/* "Submit" button */}
      <div className="form-group">
        <button
          className="btn btn-secondary"
          // onMouseOver={() => {
          //   console.log(validEmail);
          //   console.log(validPassword);
          //   console.log(matchPassword);
          // }}
          onClick={() => {
            if (
              validEmail === true &&
              validPassword === true &&
              matchPassword === true
            ) {
              props.onSignup(email, password.value);
              alert("Signup successful; logging in now.");
              props.history.push("/");
            } else {
              document.getElementById("submitSpan").innerHTML =
                "Please satisfy all the above fields.";
            }
          }}
        >
          Submit
        </button>
        <br />
        <span id="submitSpan">&nbsp;</span>
      </div>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Signup);
