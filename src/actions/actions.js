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

// This function will check if an email is in the database
export const CheckEmail = email => {
  return dispatch => {
    return axios
      .post(userURL + "/check", { email: email })
      .then(response => {
        // console.log(response);
        return response;
      })
      .catch(error => {
        throw error;
      });
  };
};
