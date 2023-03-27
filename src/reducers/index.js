import { combineReducers } from "redux";
import empleadosReducer from "./empleadosReducer";
import alertaReducer from "./alertaReducer";
import activosReducer from "./activosReducer";

export default combineReducers({
    empleados: empleadosReducer,
    activos: activosReducer,
    alerta: alertaReducer
})