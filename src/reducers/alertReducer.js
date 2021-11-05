import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initalState = [];

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initalState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT: {
      return [...state, payload];
    }
    case REMOVE_ALERT: {
      return state.filter((alert) => alert.id !== action.payload);
    }
    default:
      return state;
  }
}
