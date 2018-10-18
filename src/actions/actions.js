import { USER_LOGIN, USER_LOGOUT, USER_SIGNUP } from "./types";
import axios from "axios";

let userUrl = "http://localhost:8080/users";

export const UserLogin = (email, password) => {
  return dispatch => {
    return axios
      .post(userUrl + "/login", { email: email, password: password })
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

export const UserSignup = (email, password) => {
  return dispatch => {
    return axios
      .post(userUrl + "/signup", { email: email, password: password })
      .then(response => {
        dispatch(UserLogin(email, password));
      })
      .catch(error => {
        throw error;
      });
  };
};
