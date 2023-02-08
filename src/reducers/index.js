import { combineReducers } from "redux";
import empleadosReducer from "./empleadosReducer";

export default combineReducers({
    empleados : empleadosReducer
})