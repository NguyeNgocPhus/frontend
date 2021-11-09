import {
  GET_POSTS,
  POST_ERR,
  UPDATE_LIKE,
  ADD_POSTS,
  GET_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  DELETE_POST,
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function postReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_COMMENT:
    case DELETE_COMMENT: {
      return {
        ...state,
        post: payload,
        loading: false,
      };
    }

    case GET_POST: {
      return {
        ...state,
        post: payload,
        loading: false,
      };
    }
    case UPDATE_LIKE: {
      const newPosts = state.posts.map((post) => {
        if (post._id === payload.id) {
          return payload.likes;
        } else {
          return post;
        }
      });
      // console.log(newPosts);
      return {
        ...state,
        posts: newPosts,
      };
    }
    case ADD_POSTS: {
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    }
    case GET_POSTS: {
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    }
    case POST_ERR: {
      return {
        ...state,
        error: payload,
        loading: false,
      };
    }
    case DELETE_POST: {
      const newPost = state.posts.filter((post) => {
        return post._id !== payload._id;
      });
      return {
        ...state,
        posts: newPost,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
