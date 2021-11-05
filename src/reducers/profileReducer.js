import {
  GET_PROFILE,
  PROFILE_ERR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profileReducer = (state = initialState, actions) => {
  const { type, payload } = actions;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE: {
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    }
    case PROFILE_ERR: {
      return {
        ...state,
        error: payload,
        loading: false,
      };
    }
    case CLEAR_PROFILE: {
      return {
        profile: null,
        profiles: [],
        repos: [],
        loading: true,
        error: {},
      };
    }
    default:
      return state;
  }
};
export default profileReducer;
