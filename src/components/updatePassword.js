import React from "react";
import { connect } from "react-redux";
import { UserCheckPassword, UserUpdatePassword } from "../actions/userActions";

const mapStateToProps = state => {
  return {
    email: state.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckPassword: (email, password) =>
      dispatch(UserCheckPassword(email, password)),
    onUpdatePassword: (email, password) =>
      dispatch(UserUpdatePassword(email, password))
  };
};

const UpdatePassword = props => {
  let email = props.email;
  let currentPassword;
  let validCurrentPassword = false;
  let newPassword;
  let validNewPassword = false;
  let confirmNewPassword;
  let matchNewPassword = false;

  return (
    <div>
      <h3>Update Password</h3>

      {/* Current Password input */}
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Current Password"
          ref={cP => {
            currentPassword = cP;
          }}
          onChange={() => {
            props.onCheckPassword(email, currentPassword.value).then(result => {
              validCurrentPassword = result.data;
            });
          }}
        />
        {/* <span id="currentPasswordSpan">&nbsp;</span> */}
      </div>

      {/* Password Requirements table */}
      <div className="form-group">
        <h6>Passwords have the following requirements:</h6>
        <table align="center">
          <tbody>
            <tr>
              <td>
                <span id="requirement1Span" role="img" aria-label="1">
                  1️⃣&nbsp;
                </span>
              </td>
              <td align="left">8 or more characters</td>
            </tr>

            <tr>
              <td>
                <span id="requirement2Span" role="img" aria-label="2">
                  2️⃣&nbsp;
                </span>
              </td>
              <td align="left">1 uppercase letter</td>
            </tr>
            <tr>
              <td>
                <span id="requirement3Span" role="img" aria-label="3">
                  3️⃣&nbsp;
                </span>
              </td>
              <td align="left">1 lowercase letter</td>
            </tr>
            <tr>
              <td>
                <span id="requirement4Span" role="img" aria-label="4">
                  4️⃣&nbsp;
                </span>
              </td>
              <td align="left">
                1 number <i>or</i> 1 non-alphanumeric character
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* New Password input */}
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="New Password"
          ref={nP => {
            newPassword = nP;
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
            } else {
              document.getElementById("requirement1Span").innerHTML =
                "1️⃣&nbsp;";
            }

            if (newPassword.value !== "") {
              if (hasUpperCase === true) {
                document.getElementById("requirement2Span").innerHTML =
                  "✅&nbsp;";
              } else {
                document.getElementById("requirement2Span").innerHTML =
                  "🔴&nbsp;";
              }
            } else {
              document.getElementById("requirement2Span").innerHTML =
                "2️⃣&nbsp;";
            }

            if (newPassword.value !== "") {
              if (hasLowerCase === true) {
                document.getElementById("requirement3Span").innerHTML =
                  "✅&nbsp;";
              } else {
                document.getElementById("requirement3Span").innerHTML =
                  "🔴&nbsp;";
              }
            } else {
              document.getElementById("requirement3Span").innerHTML =
                "3️⃣&nbsp;";
            }

            if (newPassword.value !== "") {
              if (hasNumber === true || hasNonAlphaNumeric === true) {
                document.getElementById("requirement4Span").innerHTML =
                  "✅&nbsp;";
              } else {
                document.getElementById("requirement4Span").innerHTML =
                  "🔴&nbsp;";
              }
            } else {
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

            if (newPassword.value !== "" && confirmNewPassword.value !== "") {
              if (newPassword.value === confirmNewPassword.value) {
                matchNewPassword = true;
                document.getElementById("confirmNewPasswordSpan").innerHTML =
                  "Passwords match.";
              } else {
                matchNewPassword = false;
                document.getElementById("confirmNewPasswordSpan").innerHTML =
                  "Passwords do not match.";
              }
            } else {
              document.getElementById("confirmNewPasswordSpan").innerHTML =
                "&nbsp;";
            }
          }}
        />
      </div>

      {/* Confirm New Password input */}
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Confirm New Password"
          ref={cNP => {
            confirmNewPassword = cNP;
          }}
          onChange={() => {
            if (newPassword.value !== "" && confirmNewPassword.value !== "") {
              if (newPassword.value === confirmNewPassword.value) {
                matchNewPassword = true;
                document.getElementById("confirmNewPasswordSpan").innerHTML =
                  "Passwords match.";
              } else {
                matchNewPassword = false;
                document.getElementById("confirmNewPasswordSpan").innerHTML =
                  "Passwords do not match.";
              }
            } else {
              document.getElementById("confirmNewPasswordSpan").innerHTML =
                "&nbsp;";
            }
          }}
        />
        <span id="confirmNewPasswordSpan">&nbsp;</span>
      </div>

      {/* Submit button */}
      <div className="form-group">
        <button
          className="btn btn-secondary"
          onClick={() => {
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
)(UpdatePassword);
