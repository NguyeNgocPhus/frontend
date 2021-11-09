import axios from "axios";
import {
  ADD_POSTS,
  GET_POSTS,
  POST_ERR,
  UPDATE_LIKE,
  GET_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  DELETE_POST,
} from "./types";

import { setAlert } from "./alertAction";

//get all posts
export const getAllPosts = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/posts");

      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    } catch (error) {
      dispatch(setAlert(error.response.data, "danger"));
      dispatch({
        type: POST_ERR,
        payload: {
          msg: error.response.data,
          status: error.response.status,
        },
      });
    }
  };
};

//get post by id
export const getPost = (postId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/post/${postId}`);
      // console.log(res.data);
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    } catch (error) {
      dispatch(setAlert(error.response.data, "danger"));
      dispatch({
        type: POST_ERR,
        payload: {
          msg: error.response.data,
          status: error.response.status,
        },
      });
    }
  };
};

/// add like
export const addLike = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/post/like/${id}`);

      dispatch({
        type: UPDATE_LIKE,
        payload: {
          id,
          likes: res.data,
        },
      });
    } catch (error) {
      //dispatch(setAlert(error.response.data, "danger"));
      dispatch({
        type: POST_ERR,
        payload: {
          msg: error.response.data,
          status: error.response.status,
        },
      });
    }
  };
};

// remove like
export const removeLike = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/post/unlike/${id}`);

      dispatch({
        type: UPDATE_LIKE,
        payload: {
          id,
          likes: res.data,
        },
      });
    } catch (error) {
      dispatch({
        type: POST_ERR,
        payload: {
          msg: error.response.data,
          status: error.response.status,
        },
      });
    }
  };
};

/// delete post
export const deletePost = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`api/post/${id}`);
      dispatch(setAlert("remove success", "success"));
      dispatch({
        type: DELETE_POST,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: POST_ERR,
        payload: {
          msg: error.response.data,
          status: error.response.status,
        },
      });
    }
  };
};
/// add posts
export const addPosts = (postData) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/posts", postData, config);
      dispatch(setAlert("add post success", "success"));
      dispatch({
        type: ADD_POSTS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: POST_ERR,
        payload: {
          msg: error.response.data,
          status: error.response.status,
        },
      });
    }
  };
};

/// add comment
export const addComment = (postData, postId) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `/api/post/comment/${postId}`,
        postData,
        config
      );
      console.log(res.data);
      dispatch(setAlert("comment add success", "success"));
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: POST_ERR,
        payload: {
          msg: error.response.data,
          status: error.response.status,
        },
      });
    }
  };
};

/// delete comment
export const deleteComment = (postId, comment_id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `/api/post/comment/${postId}/${comment_id}`
      );
      dispatch(setAlert("delete success", "danger"));
      dispatch({
        type: DELETE_COMMENT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: POST_ERR,
        payload: {
          msg: error.response.data,
          status: error.response.status,
        },
      });
    }
  };
};
