import React from "react";
import { connect } from "react-redux";
import { UserSignup, CheckEmail } from "../actions/actions";



const mapDispatchToProps = dispatch => {
  return {
    onSignup: (email, password) => dispatch(UserSignup(email, password)),
    onCheckEmail: email => dispatch(CheckEmail(email))
  };
};

const Signup = props => {

  let email;
  let validEmail;

  let password;
  let validPassword;

  let confirmPassword;
  let matchPassword;

  return (
    <div>
      <h3>Signup</h3>


      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          ref={e => {
            email = e;
          }}

        />
        <span />
      </div>


      <div className="form-group">
        <h6>
          Passwords must be at least 8 characters, have 1 uppercase letter, 1
          lowercase letter, and 1 number or 1 non-alphanumeric character.
        </h6>
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          ref={p => {
            password = p;
          }}

          onBlur={() => {

          }}
        />
      </div>


      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Confirm Password"
          ref={cP => {
            confirmPassword = cP;
          }}

        />
      </div>

      <div className="form-group">
        <button
          className="btn btn-secondary"
          onClick={() => {

            // emailRegex

            let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (email.value.match(emailRegex)) {
              props.onCheckEmail(email.value).then(result => {
                if (result.data.count === 0) {
                  validEmail = true;
                  console.log("validEmail: " + validEmail);
                } else {
                  validEmail = false;
                  console.log(
                    "Email already in use; provide a different email or login."
                  );
                }
              });
            } else {
              validEmail = false;
              console.log("Not a valid email.");
            }

            // passwordRegex

            let hasUpperCase = /[A-Z]/.test(password.value);
            let hasLowerCase = /[a-z]/.test(password.value);
            let hasNumber = /\d/.test(password.value);
            let hasNonAlphaNumeric = /\W/.test(password.value);

            if (
              password.value.length >= 8 &&
              hasUpperCase + hasLowerCase + hasNumber + hasNonAlphaNumeric >= 3
            ) {
              validPassword = true;
              console.log("validPassword: " + validPassword);
            } else {
              validPassword = false;
              console.log("Password does not fulfill requirements.");
            }

            // confirmPassword

            if (password.value === confirmPassword.value) {
              matchPassword = true;
              console.log("matchPassword: " + matchPassword);
            } else {
              matchPassword = false;
              console.log("Passwords do not match.");
            }

            // lastStep

            if (
              validEmail === true &&
              validPassword === true &&
              matchPassword === true
            ) {
              props.onSignup(email.value, password.value);
              console.log("Signup successful; logging in now.");
              props.history.push("/");
            } else {
              console.log("Signup requirements are not fulfilled.");
            }


          }}
        >
          Submit
        </button>
      </div>
    </div >
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Signup);

