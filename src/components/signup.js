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
            props.onCheckEmail(email.value).then(result => {
              if (result.data.count === 1) {
                alert(
                  "Email already in use; provide a different email or login."
                );
              } else {
                validEmail = true;
              }
            });
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
          onBlur={() => {}}
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
              alert("Signup successful; logging in now.");
              props.history.push("/");
            } else {
              alert("Passwords do not match.");
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
