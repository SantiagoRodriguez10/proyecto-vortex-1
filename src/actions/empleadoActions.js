import {
    AGREGAR_EMPLEADO,
    AGREGAR_EMPLEADO_EXITO,
    AGREGAR_EMPLEADO_ERROR,
    COMENZAR_DESCARGA_EMPLEADOS,
    DESCARGA_EMPLEADOS_EXITO,
    DESCARGA_EMPLEADOS_ERROR
} from '../types'
import empleadoAxios from '../config/axios'

//Importo SweetAlert2
import Swal from 'sweetalert2'

//Creando nuevos empleados
export function crearNuevoEmpleadoAction(empleado) {
    return async (dispatch) => {
        dispatch( agregarEmpleado() )

        try {
            //Insertar en el Json-Server
            await empleadoAxios.post('/employees', empleado)

            //Si tenemos exito en el request, actualizamos el state
            dispatch( agregarEmpleadoExito(empleado) )

            //Llamo al SA2
            Swal.fire(
                'Correcto',
                'El empleado se agregó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error)
            //Si hay un error modificar el state
            dispatch( agregarEmpleadoError(true) )

            Swal.fire({
                icon:'error',
                title:'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            }
            )
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
const agregarEmpleadoError = estado => ({
    type: AGREGAR_EMPLEADO_ERROR,
    payload: estado
})  

//Funcion que descargan los empleados en la db
export function obtenerEmpleadosAction() {
    return async (dispatch) => {
        dispatch( descargarEmpleados() )

        try {
            const respuesta = await empleadoAxios.get('/employees')
            dispatch( descargaEmpleadosExitosa(respuesta.data) )
        } catch (error) {
            console.log(error)
            dispatch( descargaEmpleadosError() )
        }
    }
}

const descargarEmpleados = () => ({
    type: COMENZAR_DESCARGA_EMPLEADOS,
    payload: true
})

const descargaEmpleadosExitosa = empleados => ({
    type: DESCARGA_EMPLEADOS_EXITO,
    payload: empleados
})

const descargaEmpleadosError = () => ({
    type: DESCARGA_EMPLEADOS_ERROR,
    payload: true
})