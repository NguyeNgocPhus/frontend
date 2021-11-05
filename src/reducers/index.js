import { combineReducers } from "redux";
import alert from "./alertReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
const rootReducer = combineReducers({
  alert,
  auth: authReducer,
  profile: profileReducer,
});
export default rootReducer;
