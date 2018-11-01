import { USER_LOGIN, USER_LOGOUT } from "./types";
import axios from "axios";

let userURL = "http://localhost:8080/users";
// let userURL = "https://development-deployment-server.herokuapp.com/users";

export const UserSignup = (email, password) => {
  return dispatch => {
    return axios
      .post(userURL + "/signup", { email: email, password: password })
      .then(response => {
        dispatch(UserLogin(response.data.email, password));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const UserLogin = (email, password) => {
  return dispatch => {
    return axios
      .post(userURL + "/login", { email: email, password: password })
      .then(response => {
        dispatch(UserLoginSuccess(response.data.email, response.data._id));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const UserLoginSuccess = (email, token) => {
  return {
    type: USER_LOGIN,
    email: email,
    token: token
  };
};

export const UserLogout = () => {
  return {
    type: USER_LOGOUT
  };
};

// Check whether an email is in database and return count:
// 0 email is not present; 1 email is present
export const UserCheckEmail = email => {
  return dispatch => {
    return axios
      .post(userURL + "/checkEmail", { email: email })
      .then(response => {
        // console.log(response);
        return response;
      })
      .catch(error => {
        throw error;
      });
  };
};

// Check whether an email has a matching password and returns boolean:
// true password is correct, false password is incorrect
export const UserCheckPassword = (email, password) => {
  return dispatch => {
    return axios
      .post(userURL + "/checkPassword", { email: email, password: password })
      .then(response => {
        // console.log(response);
        return response;
      })
      .catch(error => {
        throw error;
      });
  };
};

// Searches database by email property using oldEmail
// Updates email property with newEmail
export const UserUpdateEmail = (currentEmail, newEmail, password) => {
  return dispatch => {
    return axios
      .put(userURL + "/updateEmail", {
        currentEmail: currentEmail,
        newEmail: newEmail
      })
      .then(response => {
        // console.log(response);
        dispatch(UserLogin(response.data.email, password));
      })
      .catch(error => {
        throw error;
      });
  };
};

// Searches database by email property
// Updates password property with encrypted tempUser.password
export const UserUpdatePassword = (email, password) => {
  // console.log(email, password);
  return dispatch => {
    return axios
      .put(userURL + "/updatePassword", { email: email, password: password })
      .then(response => {
        // console.log(response);
        dispatch(UserLogin(response.data.email, password));
      })
      .catch(error => {
        console.log(error);
      });
  };
};
