import React from "react";
import { connect } from "react-redux";
import { CheckEmail } from "../actions/actions";

const mapStateToProps = state => {
  return {
    email: state.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckEmail: email => dispatch(CheckEmail(email))
  };
};

const changeEmail = props => {
  let newEmail;
  let validNewEmail = false;
  let password;

  return (
    <div>
      <h3>Change Email</h3>

      <div className="form-group">
        <span>Current email: {props.email}</span>
        <input
          // id="newEmailInput"
          type="text"
          className="form-control"
          placeholder="New Email"
          ref={nE => {
            newEmail = nE;
          }}
          onChange={() => {
            let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            // if (document.getElementById("newEmailInput").value !== "") {
            if (newEmail.value !== props.email) {
              if (emailRegex.test(newEmail.value)) {
                props.onCheckEmail(newEmail.value).then(result => {
                  if (result.data.count === 0) {
                    validNewEmail = true;
                    document.getElementById("newEmail").innerHTML =
                      "Email is valid.";
                  } else {
                    validNewEmail = false;
                    document.getElementById("newEmail").innerHTML =
                      "Email already in use; provide a different email.";
                  }
                });
              } else {
                validNewEmail = false;
                document.getElementById("newEmail").innerHTML =
                  "Not a valid email.";
              }
            } else {
              validNewEmail = false;
              document.getElementById("newEmail").innerHTML =
                "Cannot change email to current email.";
            }
            // } else {
            //   document.getElementById("newEmail").innerHTML = <br />;
            // }
          }}
        />
        <span id="newEmail">
          <br />
        </span>
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          ref={p => {
            password = p;
          }}
        />
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
)(changeEmail);
