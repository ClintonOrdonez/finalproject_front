import React from "react";
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

const DeleteAccount = props => {
  let currentEmail = props.email;
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
        <p>
          Please enter the email and password for the account currently in use
          to confirm deletion.
        </p>
      </div>

      {/* "Email" input */}
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

      {/* "Password" input */}
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

      {/* "I Understand" checkbox */}
      <div className="form-group">
        <p>
          Once an account has been deleted, all information is erased and cannot
          be recovered for any reason. Account deletion is instantaneous, and
          cannot be canceled once submitted.
        </p>
        <div className="btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-outline-warning">
            <input id="iUnderstand" type="checkbox" autoComplete="off" />I
            Understand
          </label>
        </div>
      </div>

      {/* "Delete" button */}
      <div className="form-group">
        <Button
          outline
          color="danger"
          // className="btn btn-secondary"
          // onMouseOver={() => {
          //   console.log("email: " + validEmail);
          //   console.log("password: " + validPassword);
          //   console.log(
          //     "checked: " + document.getElementById("iUnderstand").checked
          //   );
          // }}
          onClick={() => {
            if (
              validEmail === true &&
              validPassword === true &&
              document.getElementById("iUnderstand").checked === true
            ) {
              alert("User account has been successfully deleted.");
              props.onDeleteAccount(currentEmail);
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteAccount);
