import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    token: state.token,
    email: state.email
  };
};

const Home = props => (
  <div>
    <h3 className="cover-heading">Home</h3>
    {props.token && <h3>Welcome {props.email}!</h3>}
    <p className="lead">
      This is the landing page for our project. We will create an introduction
      here.
    </p>
  </div>
);

export default withRouter(connect(mapStateToProps)(Home));

//to change Home to black text

// import React from "react";
// import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";

// const mapStateToProps = state => {
//   return {
//     token: state.token,
//     email: state.email
//   };
// };

// const Home = props => (
//   <div>
//     <h3 className="cover-heading jeromesH3CSS">Home</h3>
//     {props.token && <h3>Welcome {props.email}!</h3>}
//     <p className="lead jeromesPCSS">
//       This is the landing page for our project. We will create an introduction
//       here.
//     </p>
//   </div>
// );

// export default withRouter(connect(mapStateToProps)(Home));
