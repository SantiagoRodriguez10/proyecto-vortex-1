import { combineReducers } from "redux";
import empleadosReducer from "./empleadosReducer";
import alertaReducer from "./alertaReducer";

export default combineReducers({
    empleados : empleadosReducer,
    alerta: alertaReducer
})