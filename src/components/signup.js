import React from "react";
import { connect } from "react-redux";
import { UserSignup } from "../actions/actions";

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
                    className="form-control"
                    placeholder="email"
                    ref={u => {
                        email = u;
                    }}
                />
            </div>
            <div className="form-group">
                <input
                    className="form-control"
                    placeholder="password"
                    ref={p => {
                        password = p;
                    }}
                />
            </div>
            <div className="form-group">
                <input
                    className="form-control"
                    placeholder="password"
                    ref={p => {
                        password = p;
                    }}
                />
            </div>

            <div className="form-group">
                <button
                    className="btn btn-default"
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
