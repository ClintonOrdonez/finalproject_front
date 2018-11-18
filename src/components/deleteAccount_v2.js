import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
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

class DeleteAccount extends Component {
  constructor(props) {
    super(props);

    this.state = { cSelected: [] };

    this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
  }

  onCheckboxBtnClick(selected) {
    const index = this.state.cSelected.indexOf(selected);
    if (index < 0) {
      this.state.cSelected.push(selected);
    } else {
      this.state.cSelected.splice(index, 1);
    }
    this.setState({ cSelected: [...this.state.cSelected] });
  }

  render() {
    let currentEmail = this.props.email;
    let emailRaw;
    let email;
    let validEmail = false;
    let password;
    let validPassword = false;

    return (
      <div>
        {/* "Delete Account" header */}
        <div className="form-group">
          <h3>Delete Account</h3>
        </div>

        {/* "I Understand" checkbox */}
        <div className="form-group">
          <p>
            Once an account has been deleted, all information is erased and
            cannot be recovered for any reason. Account deletion is
            instantaneous, and cannot be canceled once submitted.
          </p>
          <Button
            outline
            color="warning"
            onClick={() => {
              this.onCheckboxBtnClick(1);
              if (this.state.cSelected === 1) {
                document.getElementById("email").disabled = false;
                document.getElementById("password").disabled = false;
                document.getElementById("delete").disabled = false;
              } else {
                document.getElementById("email").disabled = true;
                document.getElementById("password").disabled = true;
                document.getElementById("delete").disabled = true;
              }
            }}
            active={this.state.cSelected.includes(1)}
          >
            I Understand
          </Button>
        </div>

        {/* "Email" input */}
        <div className="form-group">
          <p>
            Please enter the email and password for the current account to
            confirm deletion.
          </p>
          <input
            disabled
            id="email"
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

        {/* "Password" input */}
        <div className="form-group">
          <input
            disabled
            id="password"
            type="password"
            className="form-control"
            placeholder="Password"
            ref={p => {
              password = p;
            }}
            onChange={() => {
              this.props
                .onCheckPassword(currentEmail, password.value)
                .then(result => {
                  validPassword = result.data;
                });
            }}
          />
        </div>

        {/* "Delete" button */}
        <div className="form-group">
          <Button
            disabled
            id="delete"
            outline
            color="danger"
            onMouseOver={() => {
              console.log("email: " + validEmail);
              console.log("password: " + validPassword);
              console.log("checked: " + this.state.cSelected);
            }}
            onClick={() => {
              if (
                validEmail === true &&
                validPassword === true &&
                this.state.cSelected === 1
              ) {
                alert("User account has been successfully deleted.");
                this.props.onDeleteAccount(currentEmail);
              } else {
                document.getElementById("deleteSpan").innerHTML =
                  "Please satisfy all the above fields.";
              }
            }}
          >
            Delete
          </Button>
          <br />
          <span id="deleteSpan">&nbsp;</span>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteAccount);
