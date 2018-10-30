import { USER_LOGIN, USER_LOGOUT } from "./types";
import axios from "axios";

let userURL = "http://localhost:8080/users";

export const UserSignup = (email, password) => {
  return dispatch => {
    return axios
      .post(userURL + "/signup", { email: email, password: password })
      .then(response => {
        dispatch(UserLogin(email, password));
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
        dispatch(userLoginSuccess(response.data.email, response.data._id));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const userLoginSuccess = (email, token) => {
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
export const CheckEmail = email => {
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

// Check whether an email has a matching password:
// true password is correct, false password is incorrect
export const CheckPassword = (email, password) => {
  return dispatch => {
    return axios
      .post(userURL + "/checkPassword", { email: email, password: password })
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => {
        throw error;
      });
  };
};
