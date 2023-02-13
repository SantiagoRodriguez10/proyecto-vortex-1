import {
    AGREGAR_EMPLEADO,
    AGREGAR_EMPLEADO_EXITO,
    AGREGAR_EMPLEADO_ERROR,

    COMENZAR_DESCARGA_EMPLEADOS,
    DESCARGA_EMPLEADOS_EXITO,
    DESCARGA_EMPLEADOS_ERROR,

    OBTENER_EMPLEADO_EDITAR,
    COMENZAR_EDICION_EMPLEADO ,
    EMPLEADO_EDITADO_EXITO ,
    EMPLEADO_EDITADO_ERROR ,

    OBTENER_EMPLEADO_ELIMINAR,
    EMPLEADO_ELIMINADO_EXITO,
    EMPLEADO_ELIMINADO_ERROR
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

//Colocar empleado en edición
export function obtenerEmpleadoEditar(empleado) {
    return (dispatch) => {
        dispatch( obtenerEmpleadoEditarAction(empleado) )
    }
}
const obtenerEmpleadoEditarAction = empleado => ({
    type: OBTENER_EMPLEADO_EDITAR,
    payload: empleado
})

//Registra un producto en la API y en state
export function editarEmpleadoAction(empleado) {
    return async (dispatch) => {
        dispatch( editarEmpleado() )
        try {
            await empleadoAxios.put(`employees/${empleado.id}`, empleado)
            dispatch(editarEmpleadoExito(empleado) )
        } catch (error) {
            dispatch( editarEmpleadoError() ) 
        }
    }
}
const editarEmpleado = () => ({
    type: COMENZAR_EDICION_EMPLEADO
})

const editarEmpleadoExito = empleado => ({
    type: EMPLEADO_EDITADO_EXITO,
    payload: empleado
})

const editarEmpleadoError = empleado => ({
    type: EMPLEADO_EDITADO_ERROR,
    payload: true
})

//Selecciona y elimina el producto
export function borrarEmpleadoAction(empleado) {
    return async (dispatch) => {
        dispatch(obtenerEmpleadoEliminar(empleado))
        
        try {
            await empleadoAxios.delete(`/employees/${empleado}`)
            dispatch( eliminarEmpleadoExito() )

            //Si se elimina, mostrar Alert
            await Swal.fire(
                'Eliminado!',
                'El empleado se eliminó correctamente.',
                'success'
            )
        } catch (error) {
            console.log(error)
            dispatch( eliminarEmpleadoError() )
        }

    }
}

const obtenerEmpleadoEliminar = empleado => ({
    type: OBTENER_EMPLEADO_ELIMINAR,
    payload: empleado
})

const eliminarEmpleadoExito = () => ({
    type: EMPLEADO_ELIMINADO_EXITO
})

const eliminarEmpleadoError = () => ({
    type: EMPLEADO_ELIMINADO_ERROR,
    payload: true
}) 