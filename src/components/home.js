import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    email: state.email,
    token: state.token
  };
};

const Home = props => {
  return (
    <div>
      <h3 className="cover-heading">Home</h3>

      <p className="lead">
        This is the landing page for Team Gestalt's project. Our project
        demonstrates a functional signup and login, all verified and tracked
        through a database. Users have the ability to update their email and
        password when logged in, reset their password if it has been forgotten,
        and delete all their user information from the database. Furthermore,
        users can select a theme of their liking which is saved and applied upon
        login. Finally, users can play a riveting game of Tic-Tac-Toe with stats
        that are dynamically tracked.
      </p>
      {props.token !== null && <h3>Welcome {props.email}!</h3>}
    </div>
  );
};

export default connect(mapStateToProps)(Home);
