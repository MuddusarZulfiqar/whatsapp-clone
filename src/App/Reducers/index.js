import { combineReducers } from "redux";
import UserReducer from "./userReducer";
const RootReducer = combineReducers({
  User: UserReducer,
});

export default RootReducer;
