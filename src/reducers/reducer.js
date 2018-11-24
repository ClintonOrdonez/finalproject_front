import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_UPDATE_TICTACTOE_STATS,
  USER_UPDATE_THEME,
  USER_UPDATE_PASSWORD,
  USER_RESET_PASSWORD
} from "../actions/types";

const initialState = {
  email: null,
  token: null,
  ticTacToeStats: null,
  theme: 1,
  resetPasswordExpiration: null
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        email: action.email,
        token: action.token,
        ticTacToeStats: action.ticTacToeStats,
        theme: action.theme
      };
    case USER_LOGOUT:
      return {
        ...state,
        email: null,
        token: null,
        theme: 1
      };
    case USER_UPDATE_TICTACTOE_STATS:
      return {
        ...state,
        ticTacToeStats: action.ticTacToeStats
      };
    case USER_UPDATE_THEME:
      return {
        ...state,
        theme: action.theme
      };
    case USER_UPDATE_PASSWORD:
      return {
        ...state,
        resetPasswordExpiration: null
      };
    case USER_RESET_PASSWORD:
      return {
        ...state,
        email: action.email,
        resetPasswordExpiration: action.resetPasswordExpiration
      };
    default:
      return state;
  }
};
