import React from "react";
import { connect } from "react-redux";
import {
  UserCheckEmail,
  UserCheckPassword,
  UserUpdateEmail
} from "../actions/userActions";

const mapStateToProps = state => {
  return {
    email: state.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckEmail: email => dispatch(UserCheckEmail(email)),
    onCheckPassword: (email, password) =>
      dispatch(UserCheckPassword(email, password)),
    onUpdateEmail: (currentEmail, newEmail, password) =>
      dispatch(UserUpdateEmail(currentEmail, newEmail, password))
  };
};

const UpdateEmail = props => {
  let currentEmail = props.email;
  let newEmailRaw;
  let newEmail;
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let validNewEmail = false;
  let password;
  let validPassword = false;

  return (
    <div>
      <h3>Update Email</h3>

      {/* New Email input */}
      <div className="form-group">
        <span>Current email: {currentEmail}</span>
        <input
          id="newEmail"
          type="text"
          className="form-control"
          placeholder="New Email"
          ref={nER => {
            newEmailRaw = nER;
          }}
          onChange={() => {
            newEmail = newEmailRaw.value.toLowerCase();

            if (newEmail !== "") {
              // if (newEmail.value !== currentEmail) {
              if (emailRegex.test(newEmail) === true) {
                props.onCheckEmail(newEmail).then(result => {
                  if (result.data.count === 0) {
                    validNewEmail = true;
                    document.getElementById("newEmailSpan").innerHTML =
                      "Email is valid.";
                  } else {
                    validNewEmail = false;
                    document.getElementById("newEmailSpan").innerHTML =
                      "Email already in use; provide a different email or login to existing account.";
                  }
                });
              } else {
                validNewEmail = false;
                document.getElementById("newEmailSpan").innerHTML =
                  "Not a valid email.";
              }
              // } else {
              //   validNewEmail = false;
              //   document.getElementById("newEmailSpan").innerHTML =
              //     "New email cannot be the same as current email.";
              // }
            } else {
              validNewEmail = false;
              document.getElementById("newEmailSpan").innerHTML = "&nbsp;";
            }
          }}
        />
        <span id="newEmailSpan">&nbsp;</span>
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

              // if (password.value !== "") {
              //   if (validPassword === true) {
              //     document.getElementById("passwordSpan").innerHTML =
              //       "Password is correct.";
              //   } else {
              //     document.getElementById("passwordSpan").innerHTML =
              //       "Password is incorrect.";
              //   }
              // } else {
              //   document.getElementById("passwordSpan").innerHTML = "&nbsp;";
              // }
            });
          }}
        />
        {/* <span id="passwordSpan">&nbsp;</span> */}
      </div>

      {/* Submit button */}
      <div className="form-group">
        <button
          className="btn btn-secondary"
          // onMouseOver={() => {
          //   console.log("new email: " + validNewEmail);
          //   console.log("password: " + validPassword);
          // }}
          onClick={() => {
            if (validNewEmail === true && validPassword === true) {
              props.onUpdateEmail(currentEmail, newEmail, password.value);
              alert(
                "Email has been updated from " +
                  currentEmail +
                  " to " +
                  newEmail +
                  " successfully."
              );
              document.getElementById("newEmail").value = "";
              document.getElementById("newEmailSpan").innerHTML = "&nbsp;";
              document.getElementById("password").value = "";
              //   document.getElementById("passwordSpan").innerHTML = "&nbsp;";
              document.getElementById("submitSpan").innerHTML = "&nbsp;";
              props.history.push("/updateEmail");
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
)(UpdateEmail);
