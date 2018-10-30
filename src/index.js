import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./css/welcomepage.css";
import {
  ProtectedRoute,
  UnprotectedRoute,
  Home,
  Header,
  Login,
  Logout,
  Signup,
  UpdateEmail,
  UpdatePassword
} from "./components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { reducer } from "./reducers/reducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const App = props => (
  <Provider store={store}>
    <Router>
      <div className="text-center">
        <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
          <Header />
          <main className="inner cover mainSection">
            <Switch>
              <Route exact path="/" component={Home} />
              <ProtectedRoute path="/updateEmail" component={UpdateEmail} />
              <ProtectedRoute
                path="/updatePassword"
                component={UpdatePassword}
              />
              <ProtectedRoute path="/logout" component={Logout} />
              <UnprotectedRoute path="/login" component={Login} />
              <UnprotectedRoute path="/signup" component={Signup} />
              <Route
                render={() => (
                  <div>
                    <h3>Page Not Found</h3>
                    <br />
                    <span
                      className="notfound"
                      role="img"
                      aria-label="not found"
                    >
                      🤓
                    </span>
                  </div>
                )}
              />
            </Switch>
          </main>
        </div>
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
