import React from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup } from "reactstrap";

const mapStateToProps = state => {
  return {
    email: state.email,
    theme: state.theme
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const Theme = props => {
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
            document.documentElement.style.setProperty("--color1", "#000");
            document.documentElement.style.setProperty("--color2", "#eee");
            document.documentElement.style.setProperty("--color3", "#ccc");
            document.documentElement.style.setProperty(
              "--color4",
              "rgba(255, 255, 255, 0.5)"
            );
            document.documentElement.style.setProperty(
              "--color5",
              "rgba(0, 0, 0, 0.5)"
            );
            document.documentElement.style.setProperty(
              "--color6",
              "rgba(0, 0, 0, 0.25)"
            );
          }}
        >
          Light
        </Button>
        {/* {Dark Theme} */}
        <Button
          onClick={() => {
            document.documentElement.style.setProperty("--color1", "#fff");
            document.documentElement.style.setProperty("--color2", "#111");
            document.documentElement.style.setProperty("--color3", "#333");
            document.documentElement.style.setProperty(
              "--color4",
              "rgba(0, 0, 0, 0.5)"
            );
            document.documentElement.style.setProperty(
              "--color5",
              "rgba(255, 255, 255, 0.5)"
            );
            document.documentElement.style.setProperty(
              "--color6",
              "rgba(255, 255, 255, 0.25)"
            );
          }}
        >
          Dark
        </Button>
        {/* {Extra Theme} */}
        <Button
          onClick={() => {
            document.documentElement.style.setProperty("--color1", "yellow");
            document.documentElement.style.setProperty("--color2", "blue");
            document.documentElement.style.setProperty("--color3", "blue");
            document.documentElement.style.setProperty("--color4", "blue");
            document.documentElement.style.setProperty("--color5", "blue");
            document.documentElement.style.setProperty("--color6", "blue");
          }}
        >
          Theme 3
        </Button>
        <Button
          onClick={() => {
            document.documentElement.style.setProperty("--color1", "yellow");
            document.documentElement.style.setProperty("--color2", "blue");
            document.documentElement.style.setProperty("--color3", "blue");
            document.documentElement.style.setProperty("--color4", "blue");
            document.documentElement.style.setProperty("--color5", "blue");
            document.documentElement.style.setProperty("--color6", "blue");
          }}
        >
          Theme 4
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Theme);
