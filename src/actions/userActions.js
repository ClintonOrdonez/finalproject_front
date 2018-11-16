import { USER_LOGIN, USER_LOGOUT, USER_RESET_PASSWORD } from "./types";
import axios from "axios";

let userURL = "http://localhost:8080/user";
// let userURL = "https://team-gestalt-server.herokuapp.com/user";

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
        dispatch(
          UserLoginSuccess(
            response.data.email,
            response.data._id,
            response.data.theme
          )
        );
      })
      .catch(error => {
        throw error;
      });
  };
};

export const UserLoginSuccess = (email, token, theme) => {
  return {
    type: USER_LOGIN,
    email: email,
    token: token,
    theme: theme
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

// Searches database by email property using currentEmail
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

// Searches database by email property
// Deletes found record from database
export const UserDeleteAccount = email => {
  // console.log("action email: " + email);
  return dispatch => {
    return axios
      .delete(userURL + "/deleteAccount", {
        data: { email: email }
      })
      .then(response => {
        // console.log("response email: " + response.data.email);
        dispatch(UserLogout());
      })
      .catch(error => {
        console.log(error);
      });
  };
};

// Searches database by email property
// Updates resetPasswordExpiration property with current time plus expirationMinutes
export const UserResetPassword = email => {
  return dispatch => {
    return axios
      .put(userURL + "/resetPassword", { email: email })
      .then(response => {})
      .catch(error => {
        console.log(error);
      });
  };
};

export const UserFindResetPasswordToken = resetPasswordToken => {
  return dispatch => {
    return axios
      .post(userURL + "/findResetPasswordToken", {
        resetPasswordToken: resetPasswordToken
      })
      .then(response => {
        dispatch(
          UserFindResetPasswordTokenSuccess(
            response.data.email,
            response.data.resetPasswordExpiration
          )
        );
      })
      .catch(error => {
        throw error;
      });
  };
};

export const UserFindResetPasswordTokenSuccess = (
  email,
  resetPasswordExpiration
) => {
  return {
    type: USER_RESET_PASSWORD,
    email: email,
    resetPasswordExpiration: resetPasswordExpiration
  };
};
