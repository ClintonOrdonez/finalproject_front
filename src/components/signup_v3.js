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
  constructor() {
    super();
    this.state = {
      email: "",
      validEmail: false,
      password: "",
      validPassword: false,
      confirmPassword: "",
      matchPassword: false,
      submitDisabled: true
    };
  }

  handleEmail = event => {
    let email = event.target.value;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({
      email: email
    });
    // Test for state.validEmail and display to user
    if (emailRegex.test(email)) {
      this.props.onCheckEmail(email).then(result => {
        if (result.data.count === 0) {
          this.setState({
            validEmail: true
          });
          document.getElementById("email").innerHTML = "Email is valid.";
        } else {
          this.setState({
            validEmail: false
          });
          document.getElementById("email").innerHTML =
            "Email already in use; provide a different email or login.";
        }
      });
    } else {
      this.setState({
        validEmail: false
      });
      document.getElementById("email").innerHTML = "Not a valid email.";
    }
    // Test for state.submit
    if (
      this.state.validEmail === true &&
      this.state.validPassword === true &&
      this.state.matchPassword === true
    ) {
      this.setState({
        submitDisabled: false
      });
    } else {
      this.setState({
        submitDisabled: true
      });
    }
    console.log(this.state);
  };

  handlePassword = event => {
    let password = event.target.value;
    let hasUpperCase = /[A-Z]/.test(password);
    let hasLowerCase = /[a-z]/.test(password);
    let hasNumber = /\d/.test(password);
    let hasNonAlphaNumeric = /\W/.test(password);
    this.setState({
      password: password
    });
    // Test and display if password has 8 or more characters
    if (password.length >= 8) {
      document.getElementById("requirement1").innerHTML =
        "🆗 8 or more characters 🆗";
    } else {
      document.getElementById("requirement1").innerHTML =
        "❌ 8 or more characters ❌";
    }
    // Test and display if password has 1 uppercase letter
    if (hasUpperCase === true) {
      document.getElementById("requirement2").innerHTML =
        "🆗 1 uppercase letter 🆗";
    } else {
      document.getElementById("requirement2").innerHTML =
        "❌ 1 uppercase letter ❌";
    }
    // Test and display if password has 1 lowercase letter
    if (hasLowerCase === true) {
      document.getElementById("requirement3").innerHTML =
        "🆗 1 lowercase letter 🆗";
    } else {
      document.getElementById("requirement3").innerHTML =
        "❌ 1 lowercase letter ❌";
    }
    // Test and display if password has 1 number or 1 non-alphanumeric character
    if (hasNumber === true || hasNonAlphaNumeric === true) {
      document.getElementById("requirement4").innerHTML =
        "🆗 1 number OR 1 non-alphanumeric character 🆗";
    } else {
      document.getElementById("requirement4").innerHTML =
        "❌ 1 number OR 1 non-alphanumeric character ❌";
    }
    // Test for state.validPassword
    if (
      password.length >= 8 &&
      hasUpperCase === true &&
      hasLowerCase === true &&
      (hasNumber === true || hasNonAlphaNumeric === true)
    ) {
      this.setState({
        validPassword: true
      });
    } else {
      this.setState({
        validPassword: false
      });
    }
    // Test for state.matchPassword
    if (password === this.stateconfirmPassword) {
      this.setState({
        matchPassword: true
      });
      document.getElementById("confirmPassword").innerHTML = "Passwords match.";
    } else {
      this.setState({
        matchPassword: false
      });
      document.getElementById("confirmPassword").innerHTML =
        "Passwords do not match.";
    }
    // Test for state.submit
    if (
      this.state.validEmail === true &&
      this.state.validPassword === true &&
      this.state.matchPassword === true
    ) {
      this.setState({
        submitDisabled: false
      });
    } else {
      this.setState({
        submitDisabled: true
      });
    }
    console.log(this.state);
  };

  handleConfirmPassword = event => {
    let confirmPassword = event.target.value;
    this.setState({
      confirmPassword: confirmPassword
    });
    // Test for state.matchPassword and display to user
    if (this.state.password === confirmPassword) {
      this.setState({
        matchPassword: true
      });
      document.getElementById("confirmPassword").innerHTML = "Passwords match.";
    } else {
      this.setState({
        matchPassword: false
      });
      document.getElementById("confirmPassword").innerHTML =
        "Passwords do not match.";
    }
    // Test for state.submit
    if (
      this.state.validEmail === true &&
      this.state.validPassword === true &&
      this.state.matchPassword === true
    ) {
      this.setState({
        submitDisabled: false
      });
    } else {
      this.setState({
        submitDisabled: true
      });
    }
    console.log(this.state);
  };

  handleSubmit = event => {
    this.props.onSignup(this.state.email, this.state.password);
    alert("Signup successful; logging in now.");
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <h3>Signup</h3>

        {/* Email input */}
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={this.state.email}
            onChange={event => this.handleEmail(event)}
          />
          <span id="email">
            <br />
          </span>
        </div>

        {/* Password Requirements heading */}
        <div className="form-group">
          <h6>Passwords have the following requirements:</h6>
          <h6 id="requirement1">8 or more characters</h6>
          <h6 id="requirement2">1 uppercase letter</h6>
          <h6 id="requirement3">1 lowercase letter</h6>
          <h6 id="requirement4">1 number OR 1 non-alphanumeric character</h6>
        </div>

        {/* Password input */}
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={this.state.password}
            onChange={event => this.handlePassword(event)}
          />
        </div>

        {/* Confirm Password input */}
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            value={this.state.confirmPassword}
            placeholder="Confirm Password"
            onChange={event => this.handleConfirmPassword(event)}
          />
          <span id="confirmPassword">
            <br />
          </span>
        </div>

        {/* Submit button */}
        <div className="form-group">
          <button
            id="submit"
            disabled={this.state.submitDisabled}
            className="btn btn-secondary"
            onClick={event => this.handleSubmit(event)}
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
