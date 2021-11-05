import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERR,
  LOGIN_SUCCESS,
  LOGIN_ERR,
  LOGOUT,
} from "../actions/types";
const initalState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const authReducer = (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS: {
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    }
    case REGISTER_FAIL:
    case AUTH_ERR:
    case LOGIN_ERR:
    case LOGOUT: {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    }
    case USER_LOADED: {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
