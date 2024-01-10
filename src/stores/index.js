import { combineReducers } from "redux";
import authenticationReducerAdmin from "./admins/reducers/authentication"

const allReducers = combineReducers({
  authenticationReducerAdmin,
  // Viết thêm các reducer ở đây
});

export default allReducers;