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
    console.log(this.props.theme);
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
              // document.documentElement.style.setProperty("--color1", "#000");
              // document.documentElement.style.setProperty("--color2", "#eee");
              // document.documentElement.style.setProperty("--color3", "#ccc");
              // document.documentElement.style.setProperty(
              //   "--color4",
              //   "rgba(255, 255, 255, 0.5)"
              // );
              // document.documentElement.style.setProperty(
              //   "--color5",
              //   "rgba(0, 0, 0, 0.5)"
              // );
              // document.documentElement.style.setProperty(
              //   "--color6",
              //   "rgba(0, 0, 0, 0.25)"
              // );
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
              // document.documentElement.style.setProperty("--color1", "#fff");
              // document.documentElement.style.setProperty("--color2", "#111");
              // document.documentElement.style.setProperty("--color3", "#333");
              // document.documentElement.style.setProperty(
              //   "--color4",
              //   "rgba(0, 0, 0, 0.5)"
              // );
              // document.documentElement.style.setProperty(
              //   "--color5",
              //   "rgba(255, 255, 255, 0.5)"
              // );
              // document.documentElement.style.setProperty(
              //   "--color6",
              //   "rgba(255, 255, 255, 0.25)"
              // );
            }}
            active={this.state.rSelected === theme2}
          >
            Dark
          </Button>
          {/* {Extra Theme} */}
          <Button
            onClick={() => {
              this.onRadioBtnClick(theme3);
              this.props.onUpdateTheme(email, theme3);
              // document.documentElement.style.setProperty("--color1", "#fff");
              // document.documentElement.style.setProperty(
              //   "--color2",
              //   "rgb(249, 251, 253)"
              // );
              // document.documentElement.style.setProperty(
              //   "--color3",
              //   "rgb(53, 0, 50)"
              // );
              // document.documentElement.style.setProperty(
              //   "--color4",
              //   "0.05rem solid rgb(255, 255, 255)"
              // );
              // document.documentElement.style.setProperty(
              //   "--color5",
              //   "90deg, rgb(0, 0, 0)"
              // );
              // document.documentElement.style.setProperty(
              //   "--color6",
              //   "rgb(53, 0, 50) 15%,"
              // );
            }}
            active={this.state.rSelected === theme3}
          >
            Theme 3
          </Button>
          <Button
            onClick={() => {
              this.onRadioBtnClick(theme4);
              this.props.onUpdateTheme(email, theme4);
              // document.documentElement.style.setProperty("--color1", "yellow");
              // document.documentElement.style.setProperty("--color2", "red");
              // document.documentElement.style.setProperty("--color3", "orange");
              // document.documentElement.style.setProperty("--color4", "green");
              // document.documentElement.style.setProperty("--color5", "purple");
              // document.documentElement.style.setProperty("--color6", "blue");
            }}
            active={this.state.rSelected === theme4}
          >
            Theme 4
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
