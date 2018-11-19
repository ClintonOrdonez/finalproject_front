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
      {/* "Update Password" header */}
      <div className="form-group">
        <h3>Update Password</h3>
      </div>

      {/* "Current Password" input */}
      <div className="form-group">
        <input
          id="currentPassword"
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

            if (newPassword.value !== "") {
              if (newPassword.value !== currentPassword.value) {
                document.getElementById("requirement5Span").innerHTML =
                  "✅&nbsp;";
              } else {
                document.getElementById("requirement5Span").innerHTML =
                  "🔴&nbsp;";
              }
            } else {
              document.getElementById("requirement5Span").innerHTML =
                "5️⃣&nbsp;";
            }
          }}
        />
      </div>

      {/* "New password requirements" table */}
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

            <tr>
              <td>
                <span id="requirement5Span" role="img" aria-label="5">
                  5️⃣&nbsp;
                </span>
              </td>
              <td align="left">Cannot be the same as current password</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* "New Password" input */}
      <div className="form-group">
        <input
          id="newPassword"
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

              if (newPassword.value !== currentPassword.value) {
                document.getElementById("requirement5Span").innerHTML =
                  "✅&nbsp;";
              } else {
                document.getElementById("requirement5Span").innerHTML =
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
              document.getElementById("requirement5Span").innerHTML =
                "5️⃣&nbsp;";
            }

            if (
              newPassword.value.length >= 8 &&
              hasUpperCase === true &&
              hasLowerCase === true &&
              (hasNumber === true || hasNonAlphaNumeric === true) &&
              newPassword.value !== currentPassword.value
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
              matchNewPassword = false;
              document.getElementById("confirmNewPasswordSpan").innerHTML =
                "&nbsp;";
            }
          }}
        />
      </div>

      {/* "Confirm New Password" input */}
      <div className="form-group">
        <input
          id="confirmNewPassword"
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
              matchNewPassword = false;
              document.getElementById("confirmNewPasswordSpan").innerHTML =
                "&nbsp;";
            }
          }}
        />
        <span id="confirmNewPasswordSpan">&nbsp;</span>
      </div>

      {/* "Submit" button */}
      <div className="form-group">
        <button
          className="btn btn-secondary"
          // onMouseOver={() => {
          //   console.log("current email: " + validCurrentPassword);
          //   console.log("new password: " + validNewPassword);
          //   console.log("match password: " + matchNewPassword);
          // }}
          onClick={() => {
            if (
              validCurrentPassword === true &&
              validNewPassword === true &&
              matchNewPassword === true
            ) {
              props.onUpdatePassword(email, newPassword.value);
              alert("Password has been updated successfully.");
              document.getElementById("currentPassword").value = "";
              document.getElementById("requirement1Span").innerHTML =
                "1️⃣&nbsp;";
              document.getElementById("requirement2Span").innerHTML =
                "2️⃣&nbsp;";
              document.getElementById("requirement3Span").innerHTML =
                "3️⃣&nbsp;";
              document.getElementById("requirement4Span").innerHTML =
                "4️⃣&nbsp;";
              document.getElementById("requirement5Span").innerHTML =
                "5️⃣&nbsp;";
              document.getElementById("newPassword").value = "";
              document.getElementById("confirmNewPassword").value = "";
              document.getElementById("confirmNewPasswordSpan").innerHTML =
                "&nbsp;";
              document.getElementById("submitSpan").innerHTML = "&nbsp;";
              props.history.push("/updatePassword");
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
  mapStateToProps,
  mapDispatchToProps
)(UpdatePassword);
