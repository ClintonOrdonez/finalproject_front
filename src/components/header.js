import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <header className="masthead">
        <div className="inner">
          <h3 className="masthead-brand">Header</h3>

          <nav className="nav nav-masthead justify-content-center">
            <ButtonGroup size="sm">
              <Button>
                <NavLink
                  exact
                  activeClassName="active"
                  className="nav-link"
                  to="/"
                >
                  Home
                </NavLink>
              </Button>
              {this.props.token === null && (
                <Button>
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </Button>
              )}
              {this.props.token === null && (
                <Button>
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    to="/signup"
                  >
                    Signup
                  </NavLink>
                </Button>
              )}
              {this.props.token !== null && (
                <ButtonDropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggle}
                >
                  <DropdownToggle caret>User Options</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <NavLink
                        activeClassName="active"
                        className="nav-link dropdown-item"
                        to="/theme"
                      >
                        Theme
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink
                        activeClassName="active"
                        className="nav-link dropdown-item"
                        to="/updateEmail"
                      >
                        Update Email
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink
                        activeClassName="active"
                        className="nav-link dropdown-item"
                        to="/updatePassword"
                      >
                        Update Password
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink
                        activeClassName="active"
                        className="nav-link dropdown-item"
                        to="/deleteAccount"
                      >
                        Delete Account
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink
                        activeClassName="active"
                        className="nav-link dropdown-item"
                        to="/logout"
                      >
                        Logout
                      </NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              )}
            </ButtonGroup>
          </nav>
        </div>
      </header>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Header));
