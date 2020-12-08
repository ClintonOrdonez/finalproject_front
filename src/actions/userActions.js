import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_UPDATE_TICTACTOE_STATS,
  USER_UPDATE_THEME,
  USER_UPDATE_PASSWORD,
  USER_RESET_PASSWORD
} from "./types";
import axios from "axios";

// let userURL = "http://localhost:8080/user";
let userURL = "https://team-gestalt-server.herokuapp.com/user";

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
            response.data.ticTacToeStats,
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

export const UserLoginSuccess = (email, token, ticTacToeStats, theme) => {
  return {
    type: USER_LOGIN,
    email: email,
    token: token,
    ticTacToeStats: ticTacToeStats,
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
        return response;
      })
      .catch(error => {
        throw error;
      });
  };
};

export const UserUpdateTicTacToeStats = (email, games, xWins, oWins, draws) => {
  return dispatch => {
    return axios
      .put(userURL + "/updateTicTacToeStats", {
        email: email,
        games: games,
        xWins: xWins,
        oWins: oWins,
        draws: draws
      })
      .then(response => {
        dispatch(UserUpdateTicTacToeStatsSuccess(response.data.ticTacToeStats));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const UserUpdateTicTacToeStatsSuccess = ticTacToeStats => {
  return {
    type: USER_UPDATE_TICTACTOE_STATS,
    ticTacToeStats: ticTacToeStats
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
      return dispatch => {
        document.documentElement.style.setProperty("--color1", "#4B0082");
        document.documentElement.style.setProperty("--color2", "#D8BFD8");
        document.documentElement.style.setProperty("--color3", "#EE82EE");
        document.documentElement.style.setProperty(
          "--color4",
          "rgba(230, 230, 250, 0.5)"
        );
        document.documentElement.style.setProperty(
          "--color5",
          "rgba(75, 0, 130, 0.5)"
        );
        document.documentElement.style.setProperty(
          "--color6",
          "rgba(75, 0, 130, 0.25)"
        );
      };
    case 4:
      return dispatch => {
        document.documentElement.style.setProperty("--color1", "#F0F8FF");
        document.documentElement.style.setProperty("--color2", "#0000CD");
        document.documentElement.style.setProperty("--color3", "#6A5ACD");
        document.documentElement.style.setProperty(
          "--color4",
          "rgba(25, 25, 112, 0.5)"
        );
        document.documentElement.style.setProperty(
          "--color5",
          "rgba(240, 248, 255, 0.5)"
        );
        document.documentElement.style.setProperty(
          "--color6",
          "rgba(240, 248, 255, 0.25)"
        );
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
  return dispatch => {
    return axios
      .put(userURL + "/updatePassword", { email: email, password: password })
      .then(response => {
        dispatch(UserLogin(response.data.email, password));
        dispatch(UserUpdatePasswordSuccess());
      })
      .catch(error => {
        throw error;
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
  return dispatch => {
    return axios
      .delete(userURL + "/deleteAccount", {
        data: { email: email }
      })
      .then(response => {
        dispatch(UserLogout());
      })
      .catch(error => {
        throw error;
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
        throw error;
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
