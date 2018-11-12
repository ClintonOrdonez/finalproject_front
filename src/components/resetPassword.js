import React from "react";
import { connect } from "react-redux";
import { UserCheckEmail, UserResetPassword } from "../actions/userActions";

const mapStateToProps = state => {
  return {
    resetPasswordToken: state.resetPasswordToken,
    resetPasswordExpiration: state.resetPasswordExpiration
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckEmail: email => dispatch(UserCheckEmail(email)),
    onResetPassword: email => dispatch(UserResetPassword(email))
  };
};

const ResetPassword = props => {
  let emailRaw;
  let email;
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let validEmail = false;

  return (
    <div>
      {/* "Reset Password" header */}
      <div className="form-group">
        <h3>Reset Password</h3>
        <p>
          Provide an email address for an existing account, and an email will be
          sent with a password reset link.
        </p>
      </div>

      {/* "Email" input */}
      <div className="form-group">
        <input
          id="email"
          type="text"
          className="form-control"
          placeholder="Email"
          ref={eR => {
            emailRaw = eR;
          }}
          onChange={() => {
            email = emailRaw.value.toLowerCase();

            // if (email !== "") {
            if (emailRegex.test(email) === true) {
              props.onCheckEmail(email).then(result => {
                if (result.data.count === 1) {
                  validEmail = true;
                  // document.getElementById("emailSpan").innerHTML =
                  //   "Email is valid.";
                } else {
                  validEmail = false;
                  // document.getElementById("emailSpan").innerHTML =
                  //   "Email is invalid.";
                }
              });
            } else {
              validEmail = false;
              // document.getElementById("emailSpan").innerHTML =
              //   "Email is an invalid format.";
            }
            // } else {
            //   validEmail = false;
            //   document.getElementById("emailSpan").innerHTML = "&nbsp;";
            // }
          }}
        />
        {/* <span id="emailSpan">&nbsp;</span> */}
      </div>

      {/* "Submit" button */}
      <div className="form-group">
        <button
          className="btn btn-secondary"
          // onMouseOver={() => {
          //   console.log("email: " + validEmail);
          // }}
          onClick={() => {
            if (validEmail === true) {
              props.onResetPassword(email);
              alert(
                "Your reset password request has been received. A message from teamgestalt.bot@gmail.com shall be sent shortly."
              );
              document.getElementById("email").value = "";
              document.getElementById("submitSpan").innerHTML = "&nbsp;";
              props.history.push("/resetPassword");
            } else {
              document.getElementById("submitSpan").innerHTML =
                "Please provide a valid email.";
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
)(ResetPassword);
