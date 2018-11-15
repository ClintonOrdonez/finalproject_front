import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    email: state.email,
    token: state.token
  };
};

const Header = props => (
  <header className="masthead">
    <div className="inner">
      <h3 className="masthead-brand">Header</h3>

      <nav className="nav nav-masthead justify-content-center">
        <div
          className="btn-group btn-group-sm"
          role="group"
          aria-label="header"
        >
          <button type="button" className="btn btn-secondary">
            <NavLink exact activeClassName="active" className="nav-link" to="/">
              Home
            </NavLink>
          </button>

          {props.token === null && (
            <button type="button" className="btn btn-secondary">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/login"
              >
                Login
              </NavLink>
            </button>
          )}

          {props.token === null && (
            <button type="button" className="btn btn-secondary">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/signup"
              >
                Signup
              </NavLink>
            </button>
          )}

          {props.token !== null && (
            <div className="btn-group btn-group-sm" role="group">
              <button
                id="btnGroupDropdown"
                type="button"
                className="btn btn-secondary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                User Options
              </button>

              <div className="dropdown-menu" aria-labelledby="btnGroupDropdown">
                {/* <a className="dropdown-item" href="/theme">
                  Theme - WIP
                </a> */}
                <NavLink
                  activeClassName="active"
                  className="nav-link dropdown-item"
                  to="/theme"
                >
                  Theme - WIP
                </NavLink>

                <NavLink
                  activeClassName="active"
                  className="nav-link dropdown-item"
                  to="/updateEmail"
                >
                  Update Email
                </NavLink>

                <NavLink
                  activeClassName="active"
                  className="nav-link dropdown-item"
                  to="/updatePassword"
                >
                  Update Password
                </NavLink>

                <NavLink
                  activeClassName="active"
                  className="nav-link dropdown-item"
                  to="/deleteAccount"
                >
                  Delete Account
                </NavLink>

                <NavLink
                  activeClassName="active"
                  className="nav-link dropdown-item"
                  to="/logout"
                >
                  Logout
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  </header>
);

export default withRouter(connect(mapStateToProps)(Header));
