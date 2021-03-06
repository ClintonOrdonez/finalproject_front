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
        This is the Team Gestalt project page. The database migration dragon has been slain and all may enjoy Tic-Tac-Toe once more.
      </p>
      <a href="https://discord.gg/ynwVe9f2ET">Join the Team Gestalt Discord!</a>
      {props.token !== null && <h3>Welcome {props.email}!</h3>}
    </div>
  );
};

export default connect(mapStateToProps)(Home);
