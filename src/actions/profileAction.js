import axios from "axios";

import { setAlert } from "./alertAction";

import { GET_PROFILE, PROFILE_ERR, UPDATE_PROFILE } from "./types";

//get current user profile
export const getCurrentUser = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("api/profile/me");
      if (res.data.msg) {
        dispatch({ type: GET_PROFILE, payload: null });
      } else {
        dispatch({ type: GET_PROFILE, payload: res.data });
      }
    } catch (error) {
      dispatch({
        type: PROFILE_ERR,
        payload: {
          msg: error.response.data,
          status: error.response.status,
        },
      });
    }
  };
};
//create profile or update

export const createProfile = (formData, history, edit = false) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/profile", formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "profile updated" : "profile created", "success")
      );

      if (!edit) {
        history.push("/dashboard");
      }
    } catch (error) {
      dispatch(setAlert(error.response.data, "danger"));
      dispatch({
        type: PROFILE_ERR,
        payload: {
          msg: error.response.data,
          status: error.response.status,
        },
      });
    }
  };
};

// add experience
export const addExperienceAction = (formData, history) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.put("/api/profile/experience", formData, config);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Experience added", "success"));

      history.push("/dashboard");
    } catch (error) {
      dispatch(setAlert(error.response.data, "danger"));
      dispatch({
        type: PROFILE_ERR,
        payload: {
          msg: error.response.data,
          status: error.response.status,
        },
      });
    }
  };
};

///add education

export const addEducationAction = (formData, history, edit) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.put("/api/profile/education", formData, config);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Education added", "success"));

      history.push("/dashboard");
    } catch (error) {
      //console.log(error.response);
      dispatch(setAlert(error.response.data, "danger"));
      dispatch({
        type: PROFILE_ERR,
        payload: {
          msg: error.response.data,
          status: error.response.status,
        },
      });
    }
  };
};

/// delete experience
export const deleteExperienceAction = (exp_id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/api/profile/experience/${exp_id}`);

      dispatch({
        type: "UPDATE_PROFILE",
        payload: res.data,
      });
      dispatch(setAlert("Experience Removed", "success"));
    } catch (error) {
      dispatch(setAlert(error.response.data, "danger"));
      dispatch({
        type: PROFILE_ERR,
        payload: {
          msg: error.response.data,
          status: error.response.status,
        },
      });
    }
  };
};

/// delete education
export const deleteEducationAction = (edu_id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/api/profile/education/${edu_id}`);

      dispatch({
        type: "UPDATE_PROFILE",
        payload: res.data,
      });
      dispatch(setAlert("Education Removed", "success"));
    } catch (error) {
      dispatch(setAlert(error.response.data, "danger"));
      dispatch({
        type: PROFILE_ERR,
        payload: {
          msg: error.response.data,
          status: error.response.status,
        },
      });
    }
  };
};
