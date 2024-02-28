import { combineReducers } from "redux";
import authenticationReducerAdmin from "./admins/reducers/authentication"
import authenticationReducerClient from "./clients/reducers/authentication"
import MoneyReducer from "./clients/reducers/moneyReduce"
const allReducers = combineReducers({
  authenticationReducerAdmin,
  authenticationReducerClient,
  MoneyReducer
  // Viết thêm các reducer ở đây
});

export default allReducers;