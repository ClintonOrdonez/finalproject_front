import React, { Component } from "react";
import { connect } from "react-redux";
import { UserSignup, CheckEmail } from "../actions/actions";

const mapDispatchToProps = dispatch => {
  return {
    onSignup: (email, password) => dispatch(UserSignup(email, password)),
    onCheckEmail: email => dispatch(CheckEmail(email))
  };
};

class Signup extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     submitDisabled: true
  //   };
  // }

  render() {
    // Email input variables
    let email;
    let validEmail = false;
    // Password input variables
    let password;
    let validPassword = false;
    // Confirm Password variables
    let confirmPassword;
    let matchPassword = false;
    // Submit button vairable
    let submitDisabled = true;

    return (
      <div>
        <h3>Signup</h3>

        {/* Email input */}
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            ref={e => {
              email = e;
            }}
            onChange={() => {
              let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

              if (emailRegex.test(email.value)) {
                this.props.onCheckEmail(email.value).then(result => {
                  if (result.data.count === 0) {
                    validEmail = true;
                    document.getElementById("email").innerHTML =
                      "Email is valid.";
                  } else {
                    validEmail = false;
                    document.getElementById("email").innerHTML =
                      "Email already in use; provide a different email or login.";
                  }
                });
              } else {
                validEmail = false;
                document.getElementById("email").innerHTML =
                  "Not a valid email.";
              }

              if (
                validEmail === true &&
                validPassword === true &&
                matchPassword === true
              ) {
                submitDisabled = false;
              } else {
                submitDisabled = true;
              }
              console.log(submitDisabled);

              // if (
              //   validEmail === true &&
              //   validPassword === true &&
              //   matchPassword === true
              // ) {
              //   console.log("This should be false.");
              //   this.setState({
              //     submitDisabled: false
              //   });
              // } else {
              //   this.setState({
              //     submitDisabled: true
              //   });
              // }
              // console.log(
              //   this.state + validEmail + validPassword + matchPassword
              // );
            }}
          />
          <span id="email">
            <br />
          </span>
        </div>

        {/* Password Requirements heading */}
        <div className="form-group">
          <h6>Passwords have the following requirements:</h6>
          <ul>
            <li id="requirement1">8 or more characters</li>
            <li id="requirement2">1 uppercase letter</li>
            <li id="requirement3">1 lowercase letter</li>
            <li id="requirement4">1 number OR 1 non-alphanumeric character</li>
          </ul>
        </div>

        {/* Password input */}
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

              if (password.value.length >= 8) {
                document.getElementById("requirement1").innerHTML =
                  "8 or more characters 🆗";
              } else {
                document.getElementById("requirement1").innerHTML =
                  "8 or more characters ❌";
              }

              if (hasUpperCase === true) {
                document.getElementById("requirement2").innerHTML =
                  "1 uppercase letter 🆗";
              } else {
                document.getElementById("requirement2").innerHTML =
                  "1 uppercase letter ❌";
              }

              if (hasLowerCase === true) {
                document.getElementById("requirement3").innerHTML =
                  "1 lowercase letter 🆗";
              } else {
                document.getElementById("requirement3").innerHTML =
                  "1 lowercase letter ❌";
              }

              if (hasNumber === true || hasNonAlphaNumeric === true) {
                document.getElementById("requirement4").innerHTML =
                  "1 number OR 1 non-alphanumeric character 🆗";
              } else {
                document.getElementById("requirement4").innerHTML =
                  "1 number OR 1 non-alphanumeric character ❌";
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

              if (password.value === confirmPassword.value) {
                matchPassword = true;
                document.getElementById("confirmPassword").innerHTML =
                  "Passwords match.";
              } else {
                matchPassword = false;
                document.getElementById("confirmPassword").innerHTML =
                  "Passwords do not match.";
              }

              if (
                validEmail === true &&
                validPassword === true &&
                matchPassword === true
              ) {
                submitDisabled = false;
              } else {
                submitDisabled = true;
              }
              console.log(submitDisabled);

              // if (
              //   validEmail === true &&
              //   validPassword === true &&
              //   matchPassword === true
              // ) {
              //   console.log("This should be false.");
              //   this.setState({
              //     submitDisabled: false
              //   });
              // } else {
              //   this.setState({
              //     submitDisabled: true
              //   });
              // }
              // console.log(
              //   this.state + validEmail + validPassword + matchPassword
              // );
            }}
          />
        </div>

        {/* Confirm Password input */}
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            ref={cP => {
              confirmPassword = cP;
            }}
            onChange={() => {
              if (password.value === confirmPassword.value) {
                matchPassword = true;
                document.getElementById("confirmPassword").innerHTML =
                  "Passwords match.";
              } else {
                matchPassword = false;
                document.getElementById("confirmPassword").innerHTML =
                  "Passwords do not match.";
              }

              if (
                validEmail === true &&
                validPassword === true &&
                matchPassword === true
              ) {
                submitDisabled = false;
              } else {
                submitDisabled = true;
              }
              console.log(submitDisabled);

              // if (
              //   validEmail === true &&
              //   validPassword === true &&
              //   matchPassword === true
              // ) {
              //   console.log("This should be false.");
              //   this.setState({
              //     submitDisabled: false
              //   });
              // } else {
              //   this.setState({
              //     submitDisabled: true
              //   });
              // }
              // console.log(
              //   this.state + validEmail + validPassword + matchPassword
              // );
            }}
          />
          <span id="confirmPassword">
            <br />
          </span>
        </div>

        {/* Submit button */}
        <div className="form-group">
          <button
            id="submit"
            // disabled={this.state.submitDisabled}
            disabled={submitDisabled}
            className="btn btn-secondary"
            onClick={() => {
              console.log("Button clicked!");
              this.props.onSignup(email.value, password.value);
              alert("Signup successful; logging in now.");
              this.props.history.push("/");
            }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Signup);

// This was to test whether the page would display and properly navigate
// export default Signup;
