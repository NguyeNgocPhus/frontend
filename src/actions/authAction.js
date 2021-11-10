import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alertAction";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERR,
  LOGIN_SUCCESS,
  LOGIN_ERR,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";

// load user by token
export const loadUser = () => {
  return async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      try {
        const res = await axios.get("/api/auth");

        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
      } catch (error) {
        dispatch({
          type: AUTH_ERR,
        });
      }
    } else {
      dispatch({
        type: AUTH_ERR,
      });
    }
  };
};

// register user
export const authAction = ({ name, email, password }, history) => {
  return async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({ name, email, password });
    try {
      const res = await axios.post("/api/users", body, config);
      history.push({ pathname: "/dashboard" });
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
      });
      dispatch(setAlert(error.response.data, "danger"));
    }
  };
};

//login user
export const loginAction = (email, password) => {
  return async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post("/api/login", body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (error) {
      dispatch({
        type: LOGIN_ERR,
      });
      dispatch(setAlert(error.response.data, "danger"));
    }
  };
};

// logout/clear Profile
export const logout = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_PROFILE });
  };
};
