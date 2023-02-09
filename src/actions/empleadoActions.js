import {
    AGREGAR_EMPLEADO,
    AGREGAR_EMPLEADO_EXITO,
    AGREGAR_EMPLEADO_ERROR
} from '../types'

//Creando nuevos empleados
export function crearNuevoEmpleadoAction(empleado) {
    return (dispatch) => {
        dispatch( agregarEmpleado() )

        try {
            dispatch( agregarEmpleadoExito(empleado) )
        } catch (error) {
            dispatch( agregarEmpleadoError(true) )
        }
    }
}

const agregarEmpleado = () => ({
    type: AGREGAR_EMPLEADO,
    payload: true
})

//Si el empleado se guarda en la base de datos
const agregarEmpleadoExito = empleado => ({
    type: AGREGAR_EMPLEADO_EXITO,
    payload: empleado
})

//Si hubo un error
const agregarEmpleadoError = () => ({

})