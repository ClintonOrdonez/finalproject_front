import { USER_LOGIN, USER_LOGOUT, USER_RESET_PASSWORD } from "../actions/types";

const initialState = {
  email: null,
  token: null,
  resetPasswordExpiration: null
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        email: action.email,
        token: action.token
      };
    case USER_LOGOUT:
      return {
        ...state,
        email: null,
        token: null
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
