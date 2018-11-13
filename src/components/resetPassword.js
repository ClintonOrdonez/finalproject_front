import React from "react";
import { connect } from "react-redux";
import {
  UserCheckEmail,
  UserResetPassword,
  UserFindResetPasswordToken,
  UserUpdatePassword
} from "../actions/userActions";

const mapStateToProps = state => {
  return {
    email: state.email,
    resetPasswordExpiration: state.resetPasswordExpiration
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckEmail: email => dispatch(UserCheckEmail(email)),
    onResetPassword: email => dispatch(UserResetPassword(email)),
    onFindResetPasswordToken: resetPasswordToken =>
      dispatch(UserFindResetPasswordToken(resetPasswordToken)),
    onUpdatePassword: (email, password) =>
      dispatch(UserUpdatePassword(email, password))
  };
};

const ResetPassword = props => {
  let URL = window.location.href;
  console.log(URL);
  // let removeLink = URL.split("http://localhost:3000/resetPassword/");
  let removeLink = URL.split(
    "https://team-gestalt-app.herokuapp.com/resetPassword/"
  );
  let resetPasswordToken = removeLink[1];
  let resetPasswordExpiration = Date.parse(props.resetPasswordExpiration);
  let currentDate = Date.parse(new Date());
  console.log(resetPasswordToken);
  // "Email" input variables
  let emailRaw;
  let email;
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let validEmail = false;
  // "New Password" input variables
  let newPassword;
  let validNewPassword = false;
  // "Confirm New Password" input variables
  let confirmNewPassword;
  let matchNewPassword = false;

  if (resetPasswordToken !== undefined) {
    props.onFindResetPasswordToken(resetPasswordToken).then(result => {
      console.log(props.email);
      console.log(props.resetPasswordExpiration);
    });
  }

  return (
    <div>
      {/* "Reset Password" header */}
      <div className="form-group">
        <h3>Reset Password</h3>
        {resetPasswordToken === undefined && (
          <p>Provide an email address for an existing account.</p>
        )}
        {resetPasswordToken !== undefined &&
          resetPasswordExpiration <= currentDate && (
            <p>
              <span>
                Your reset password link has expired; please requeset a{" "}
              </span>
              <a href="/resetPassword">new email</a>
              <span>.</span>
            </p>
          )}
        {resetPasswordToken !== undefined &&
          resetPasswordExpiration > currentDate && (
            <p>Enter a new password for account created with {props.email}.</p>
          )}
      </div>

      {/* "Email" input */}
      {resetPasswordToken === undefined && (
        <div className="form-group">
          <input
            id="email"
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
                  } else {
                    validEmail = false;
                  }
                });
              } else {
                validEmail = false;
              }
            }}
          />
        </div>
      )}

      {/* "Password requirements" table */}
      {resetPasswordToken !== undefined &&
        resetPasswordExpiration > currentDate && (
          <div className="form-group">
            <h6>New password requirements:</h6>
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
        )}

      {/* "New Password" input */}
      {resetPasswordToken !== undefined &&
        resetPasswordExpiration > currentDate && (
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
              ref={p => {
                newPassword = p;
              }}
              onChange={() => {
                // Separate Regex variables to test if password meets minimum requirements
                let hasUpperCase = /[A-Z]/.test(newPassword.value);
                let hasLowerCase = /[a-z]/.test(newPassword.value);
                let hasNumber = /\d/.test(newPassword.value);
                let hasNonAlphaNumeric = /\W/.test(newPassword.value);

                if (newPassword.value !== "") {
                  if (newPassword.value.length >= 8) {
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
                  newPassword.value.length >= 8 &&
                  hasUpperCase === true &&
                  hasLowerCase === true &&
                  (hasNumber === true || hasNonAlphaNumeric === true)
                ) {
                  validNewPassword = true;
                } else {
                  validNewPassword = false;
                }

                if (
                  newPassword.value !== "" &&
                  confirmNewPassword.value !== ""
                ) {
                  if (newPassword.value === confirmNewPassword.value) {
                    matchNewPassword = true;
                    document.getElementById(
                      "confirmNewPasswordSpan"
                    ).innerHTML = "Passwords match.";
                  } else {
                    matchNewPassword = false;
                    document.getElementById(
                      "confirmNewPasswordSpan"
                    ).innerHTML = "Passwords do not match.";
                  }
                } else {
                  matchNewPassword = false;
                  document.getElementById("confirmNewPasswordSpan").innerHTML =
                    "&nbsp;";
                }
              }}
            />
          </div>
        )}

      {/* "Confirm New Password" input */}
      {resetPasswordToken !== undefined &&
        resetPasswordExpiration > currentDate && (
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm New Password"
              ref={cP => {
                confirmNewPassword = cP;
              }}
              onChange={() => {
                if (
                  newPassword.value !== "" &&
                  confirmNewPassword.value !== ""
                ) {
                  if (newPassword.value === confirmNewPassword.value) {
                    matchNewPassword = true;
                    document.getElementById(
                      "confirmNewPasswordSpan"
                    ).innerHTML = "Passwords match.";
                  } else {
                    matchNewPassword = false;
                    document.getElementById(
                      "confirmNewPasswordSpan"
                    ).innerHTML = "Passwords do not match.";
                  }
                } else {
                  matchNewPassword = false;
                  document.getElementById("confirmNewPasswordSpan").innerHTML =
                    "&nbsp;";
                }
              }}
            />
            <span id="confirmNewPasswordSpan">&nbsp;</span>
          </div>
        )}

      {/* "Submit" button */}
      {(resetPasswordToken === undefined ||
        (resetPasswordToken !== undefined &&
          resetPasswordExpiration > currentDate)) && (
        <div className="form-group">
          <button
            className="btn btn-secondary"
            // onMouseOver={() => {
            //   console.log("email: " + validEmail);
            // }}
            onClick={() => {
              if (resetPasswordToken === undefined) {
                if (validEmail === true) {
                  props.onResetPassword(email);
                  alert(
                    "Your reset password request has been received. An email from teamgestalt.bot@gmail.com shall be sent to " +
                      email +
                      ". Please be aware that the email link will expire in 15 minutes."
                  );
                  document.getElementById("email").value = "";
                  document.getElementById("submitSpan").innerHTML = "&nbsp;";
                  props.history.push("/resetPassword");
                } else {
                  document.getElementById("submitSpan").innerHTML =
                    "Please provide a valid email.";
                }
              } else {
                if (validNewPassword === true && matchNewPassword === true) {
                  props.onUpdatePassword(props.email, newPassword.value);
                  alert(
                    "Password has been reset successfully; logging in now."
                  );
                  props.history.push("/");
                } else {
                  document.getElementById("submitSpan").innerHTML =
                    "Please satisfy all the above fields.";
                }
              }
            }}
          >
            Submit
          </button>
          <br />
          <span id="submitSpan">&nbsp;</span>
        </div>
      )}
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
