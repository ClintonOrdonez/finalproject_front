import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_UPDATE_THEME,
  USER_UPDATE_PASSWORD,
  USER_RESET_PASSWORD
} from "./types";
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
        dispatch(UserApplyTheme(response.data.theme));
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
  return dispatch => {
    dispatch(UserLogoutSuccess());
    dispatch(UserApplyTheme());
  };
};

export const UserLogoutSuccess = () => {
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

export const UserUpdateTheme = (email, theme) => {
  return dispatch => {
    return axios
      .put(userURL + "/updateTheme", {
        email: email,
        theme: theme
      })
      .then(response => {
        dispatch(UserUpdateThemeSuccess(response.data.theme));
        dispatch(UserApplyTheme(response.data.theme));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const UserUpdateThemeSuccess = theme => {
  return {
    type: USER_UPDATE_THEME,
    theme: theme
  };
};

export const UserApplyTheme = theme => {
  switch (theme) {
    case 1:
      return dispatch => {
        document.documentElement.style.setProperty("--color1", "#000");
        document.documentElement.style.setProperty("--color2", "#eee");
        document.documentElement.style.setProperty("--color3", "#ccc");
        document.documentElement.style.setProperty(
          "--color4",
          "rgba(255, 255, 255, 0.5)"
        );
        document.documentElement.style.setProperty(
          "--color5",
          "rgba(0, 0, 0, 0.5)"
        );
        document.documentElement.style.setProperty(
          "--color6",
          "rgba(0, 0, 0, 0.25)"
        );
      };
    case 2:
      return dispatch => {
        document.documentElement.style.setProperty("--color1", "#fff");
        document.documentElement.style.setProperty("--color2", "#111");
        document.documentElement.style.setProperty("--color3", "#333");
        document.documentElement.style.setProperty(
          "--color4",
          "rgba(0, 0, 0, 0.5)"
        );
        document.documentElement.style.setProperty(
          "--color5",
          "rgba(255, 255, 255, 0.5)"
        );
        document.documentElement.style.setProperty(
          "--color6",
          "rgba(255, 255, 255, 0.25)"
        );
      };
    case 3:
      return dipsatch => {
        document.documentElement.style.setProperty("--color1", "#fff");
        document.documentElement.style.setProperty(
          "--color2",
          "rgb(249, 251, 253)"
        );
        document.documentElement.style.setProperty(
          "--color3",
          "rgb(53, 0, 50)"
        );
        document.documentElement.style.setProperty(
          "--color4",
          "0.05rem solid rgb(255, 255, 255)"
        );
        document.documentElement.style.setProperty(
          "--color5",
          "90deg, rgb(0, 0, 0)"
        );
        document.documentElement.style.setProperty(
          "--color6",
          "rgb(53, 0, 50) 15%,"
        );
      };
    case 4:
      return dispatch => {
        document.documentElement.style.setProperty("--color1", "yellow");
        document.documentElement.style.setProperty("--color2", "red");
        document.documentElement.style.setProperty("--color3", "orange");
        document.documentElement.style.setProperty("--color4", "green");
        document.documentElement.style.setProperty("--color5", "purple");
        document.documentElement.style.setProperty("--color6", "blue");
      };
    default:
      return dispatch => {
        document.documentElement.style.setProperty("--color1", "#000");
        document.documentElement.style.setProperty("--color2", "#eee");
        document.documentElement.style.setProperty("--color3", "#ccc");
        document.documentElement.style.setProperty(
          "--color4",
          "rgba(255, 255, 255, 0.5)"
        );
        document.documentElement.style.setProperty(
          "--color5",
          "rgba(0, 0, 0, 0.5)"
        );
        document.documentElement.style.setProperty(
          "--color6",
          "rgba(0, 0, 0, 0.25)"
        );
      };
  }
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
        dispatch(UserLogin(response.data.email, password));
        dispatch(UserUpdatePasswordSuccess());
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const UserUpdatePasswordSuccess = () => {
  return {
    type: USER_UPDATE_PASSWORD
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

export const UserCheckResetPasswordToken = resetPasswordToken => {
  return dispatch => {
    return axios
      .post(userURL + "/checkResetPasswordToken", {
        resetPasswordToken: resetPasswordToken
      })
      .then(response => {
        dispatch(
          UserCheckResetPasswordTokenSuccess(
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

export const UserCheckResetPasswordTokenSuccess = (
  email,
  resetPasswordExpiration
) => {
  return {
    type: USER_RESET_PASSWORD,
    email: email,
    resetPasswordExpiration: resetPasswordExpiration
  };
};
