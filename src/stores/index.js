import { combineReducers } from "redux";
import authenticationReducerAdmin from "./admins/reducers/authentication"
import authenticationReducerClient from "./clients/reducers/authentication"
import authenticationReducerEmployer from "./employers/reducers/authentication"
import MoneyReducer from "./clients/reducers/moneyReduce"
const allReducers = combineReducers({
  authenticationReducerAdmin,
  authenticationReducerClient,
  authenticationReducerEmployer,
  MoneyReducer
  // Viết thêm các reducer ở đây
});

export default allReducers;