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
        <Button
          onClick={() => {
            console.log("blue");
            document.documentElement.style.setProperty("--color1", "blue");
          }}
        >
          Theme 1
        </Button>
        <Button>Theme 2</Button>
        <Button>Theme 3</Button>
      </ButtonGroup>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Theme);
