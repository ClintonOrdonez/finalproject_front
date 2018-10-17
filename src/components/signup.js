import React from "react";
import { connect } from "react-redux";
import { UserSignup } from "../actions/actions";

// This was to test whether the page would display and properly navigate
// const Signup = props => (
//   <div>
//     <h3 className="cover-heading">Signup</h3>
//     <p className="lead">Signup can be navigated succesfully.</p>
//   </div>
// );

const mapDispatchToProps = dispatch => {
  return {
    onSignup: (email, password) => dispatch(UserSignup(email, password))
  };
};

const Signup = props => {
  let email;
  let password;

  return (
    <div>
      <h3>Signup</h3>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          ref={u => {
            email = u;
          }}
        />
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
        <input
          type="password"
          className="form-control"
          placeholder="Reenter Password"
          ref={p => {
            password = p;
          }}
        />
      </div>

      <div className="form-group">
        <button
          className="btn btn-secondary"
          onClick={() => {
            props.onSignup(email.value, password.value);
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
  null,
  mapDispatchToProps
)(Signup);

// This was to test whether the page would display and properly navigate
// export default Signup;
