import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup } from "reactstrap";
import { UserUpdateTheme } from "../actions/userActions";

const mapStateToProps = state => {
  return {
    email: state.email,
    theme: state.theme
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateTheme: (email, theme) => dispatch(UserUpdateTheme(email, theme))
  };
};

class Theme extends Component {
  constructor(props) {
    super(props);

    this.state = { rSelected: this.props.theme };

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }

  render() {
    let email = this.props.email;
    const theme1 = 1;
    const theme2 = 2;
    const theme3 = 3;
    const theme4 = 4;

    return (
      <div>
        {/* "Theme" header */}
        <div className="form-group">
          <h3>Theme</h3>
          <p>
            Choosing a theme will save to your account and change back to your
            preference on login.
          </p>
        </div>

        {/* button group */}
        <ButtonGroup>
          {/* {Light Theme} */}
          <Button
            onClick={() => {
              this.onRadioBtnClick(theme1);
              this.props.onUpdateTheme(email, theme1);
            }}
            active={this.state.rSelected === theme1}
          >
            Light
          </Button>
          {/* {Dark Theme} */}
          <Button
            onClick={() => {
              this.onRadioBtnClick(theme2);
              this.props.onUpdateTheme(email, theme2);
            }}
            active={this.state.rSelected === theme2}
          >
            Dark
          </Button>
          {/* {Bubble Gum Theme} */}
          <Button
            onClick={() => {
              this.onRadioBtnClick(theme3);
              this.props.onUpdateTheme(email, theme3);
            }}
            active={this.state.rSelected === theme3}
          >
            Bubble Gum
          </Button>
          {/* {Cobalt Steel Theme} */}
          <Button
            onClick={() => {
              this.onRadioBtnClick(theme4);
              this.props.onUpdateTheme(email, theme4);
            }}
            active={this.state.rSelected === theme4}
          >
            Cobalt Steel
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Theme);
