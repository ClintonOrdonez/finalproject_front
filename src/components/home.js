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
        This is the Team Gestalt project page. The site is currently undergoing a database migration and will be opertaionl again soon.
      </p>
      {props.token !== null && <h3>Welcome {props.email}!</h3>}
    </div>
  );
};

export default connect(mapStateToProps)(Home);
