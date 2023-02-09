import {
    AGREGAR_EMPLEADO,
    AGREGAR_EMPLEADO_EXITO,
    AGREGAR_EMPLEADO_ERROR
} from '../types'


const initialState = {
    empleados: [],
    error : null,
    loading: false
}

export default function( state = initialState, action ) {
    switch(action.type) {
        case AGREGAR_EMPLEADO:
            return {
                ...state,
                loading: action.payload
            }
        case AGREGAR_EMPLEADO_EXITO:
            return {
                ...state,
                loading: false,
                empleados: [...state.empleados, action.payload]
            }
        case AGREGAR_EMPLEADO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}