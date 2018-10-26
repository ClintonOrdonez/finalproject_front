import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    token: state.token,
    email: state.email
  };
};

const Header = props => (
  <header className="masthead">
    <div className="inner">
      <h3 className="masthead-brand">Header</h3>
      <nav className="nav nav-masthead justify-content-center">
        <NavLink exact activeClassName="active" className="nav-link" to="/">
          [Home]
        </NavLink>

        {(props.token === null || props.token === undefined) && (
          <NavLink activeClassName="active" className="nav-link" to="/login">
            [Login]
          </NavLink>
        )}

        {props.token === null && (
          <NavLink activeClassName="active" className="nav-link" to="/signup">
            [Signup]
          </NavLink>
        )}

        {props.token && (
          <NavLink
            activeClassName="active"
            className="nav-link"
            to="/changeEmail"
          >
            [Change Email]
          </NavLink>
        )}

        {props.token && (
          <NavLink
            activeClassName="active"
            className="nav-link"
            to="/changePassword"
          >
            [Change Password]
          </NavLink>
        )}

        {props.token && (
          <NavLink activeClassName="active" className="nav-link" to="/logout">
            [Logout]
          </NavLink>
        )}
      </nav>
    </div>
  </header>
);

export default withRouter(connect(mapStateToProps)(Header));
