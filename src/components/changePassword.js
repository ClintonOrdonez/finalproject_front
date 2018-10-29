import React from "react";
import { connect } from "react-redux";
import { UserLogin } from "../actions/actions";

const mapStateToProps = state => {
  return {
    email: state.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(UserLogin(email, password))
  };
};

const changePassword = props => {
  let oldPassword;
  let newPassword;
  let validNewPassword = false;
  let confirmNewPassword;
  let matchNewPassword = false;

  return (
    <div>
      <h3>Change Password</h3>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Old Password"
          ref={oP => {
            oldPassword = oP;
          }}
        />
        <span id="oldPassword">
          <br />
        </span>
      </div>

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

            if (newPassword.value.length >= 8) {
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
              newPassword.value.length >= 8 &&
              hasUpperCase === true &&
              hasLowerCase === true &&
              (hasNumber === true || hasNonAlphaNumeric === true)
            ) {
              validNewPassword = true;
            } else {
              validNewPassword = false;
            }

            if (newPassword.value === confirmNewPassword.value) {
              matchNewPassword = true;
              document.getElementById("confirmNewPassword").innerHTML =
                "Passwords match.";
            } else {
              matchNewPassword = false;
              document.getElementById("confirmNewPassword").innerHTML =
                "Passwords do not match.";
            }
          }}
        />
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

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Confirm New Password"
          ref={cNP => {
            confirmNewPassword = cNP;
          }}
        />
        <span id="confirmNewPassword">
          <br />
        </span>
      </div>

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
)(changePassword);
