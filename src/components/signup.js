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
  let email;
  let validEmail = false;
  let password;
  // let passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;
  let validPassword = false;
  let confirmPassword;
  let passwordMatch = false;

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
          onBlur={() => {
            let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (email.value.match(emailRegex)) {
              props.onCheckEmail(email.value).then(result => {
                if (result.data.count === 0) {
                  validEmail = true;
                  console.log("validEmail: " + validEmail);
                } else {
                  console.log(
                    "Email already in use; provide a different email or login."
                  );
                }
              });
            } else {
              console.log("Not a valid email.");
            }
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
          // onBlur={() => {
          //   if (password.value.match(passwordRegex)) {
          //     validPassword = true;
          //     console.log("validPassword: " + validPassword);
          //   } else {
          //     console.log("Password does not fulfill requirements.");
          //   }
          // }}
          onBlur={() => {
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
              console.log("Password does not fulfill requirements.");
            }
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
            if (password.value === confirmPassword.value) {
              props.onSignup(email.value, password.value);
              console.log("Signup successful; logging in now.");
              props.history.push("/");
            } else {
              console.log("Passwords do not match.");
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Signup);

// This was to test whether the page would display and properly navigate
// export default Signup;
