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
        default:
            return state
    }
}