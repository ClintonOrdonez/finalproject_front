import React from "react";
import { connect } from "react-redux";
import { UserCheckPassword, UserDeleteAccount } from "../actions/userActions";

const mapStateToProps = state => {
  return {
    email: state.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckPassword: (email, password) =>
      dispatch(UserCheckPassword(email, password)),
    onDeleteAccount: email => dispatch(UserDeleteAccount(email))
  };
};

const DeleteAccount = props => {
  let currentEmail = props.email;
  let emailRaw;
  let email;
  let validEmail = false;
  let password;
  let validPassword = false;

  return (
    <div>
      <h3>Delete Account</h3>

      {/* Email input */}
      <div className="form-group">
        <input
          id="Email"
          type="text"
          className="form-control"
          placeholder="Email"
          ref={eR => {
            emailRaw = eR;
          }}
          onChange={() => {
            email = emailRaw.value.toLowerCase();

            if (email !== "") {
              if (email === currentEmail) {
                validEmail = true;
                document.getElementById("emailSpan").innerHTML =
                  "Email matches account email.";
              } else {
                validEmail = false;
                document.getElementById("emailSpan").innerHTML =
                  "Email does not match account email.";
              }
            } else {
              validEmail = false;
              document.getElementById("emailSpan").innerHTML = "&nbsp;";
            }
          }}
        />
        <span id="emailSpan">&nbsp;</span>
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
            props.onCheckPassword(currentEmail, password.value).then(result => {
              validPassword = result.data;
            });
          }}
        />
      </div>

      {/* Submit button */}
      <div className="form-group">
        <button
          className="btn btn-secondary"
          onMouseOver={() => {
            console.log("email: " + validEmail);
            console.log("password: " + validPassword);
          }}
          onClick={() => {
            if (validEmail === true && validPassword === true) {
              alert("User account has been successfully deleted.");
              props.onDeleteAccount(currentEmail);
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
)(DeleteAccount);
