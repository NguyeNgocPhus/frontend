import { combineReducers } from "redux";
import alert from "./alertReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  alert,
  auth: authReducer,
  profile: profileReducer,
  posts: postReducer,
});
export default rootReducer;
