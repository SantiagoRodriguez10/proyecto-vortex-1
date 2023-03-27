import {
    AGREGAR_ACTIVO,
    AGREGAR_ACTIVO_EXITO,
    AGREGAR_ACTIVO_ERROR,

    COMENZAR_DESCARGA_ACTIVOS,
    DESCARGA_ACTIVOS_EXITO,
    DESCARGA_ACTIVOS_ERROR,

    OBTENER_ACTIVO_EDITAR,
    COMENZAR_EDICION_ACTIVO ,
    ACTIVO_EDITADO_EXITO ,
    ACTIVO_EDITADO_ERROR ,

    OBTENER_ACTIVO_ELIMINAR,
    ACTIVO_ELIMINADO_EXITO,
    ACTIVO_ELIMINADO_ERROR
} from '../types/activos'
import empleadoAxios from '../config/axios'

//Importo SweetAlert2
import Swal from 'sweetalert2'

//Funcion que me trae los activos del back
export function obtenerActivosAction() {
    return async (dispatch) => {
        try {
            const respuesta = await empleadoAxios.get('/api/assets/get', {
                headers: {
                    'Content-Type': 'application/json'
                }
            }) 
            dispatch( descargaActivosExitosa(respuesta.data) )
        } catch (error) {
            console.log(error)
            dispatch( descargaActivosError() )
        }
    }
}

const descargarActivos = () => ({
    type: COMENZAR_DESCARGA_ACTIVOS,
    payload: true
})

const descargaActivosExitosa = activos => ({
    type: DESCARGA_ACTIVOS_EXITO,
    payload: activos
})

const descargaActivosError = () => ({
    type: DESCARGA_ACTIVOS_ERROR,
    payload: true
})

//Creando nuevos activos
export function crearNuevoActivoAction(activos) {
    return async (dispatch) => {
        dispatch( agregarActivo() )

        try {
            const respuesta = await empleadoAxios.post('api/assets/add', activos, {
                headers: {
                    'mode': 'no-cors',
                    'Content-Type': 'application/json'
                }
            }) 
            //Si tenemos exito en el request, actualizamos el state
            dispatch( agregarActivoExito(activos) )
            console.log('crearNuevoActivoAction - response: ', respuesta);
            console.log('crearNuevoActivoAction - activos: ', activos);
            //Llamo al SA2
            Swal.fire(
                'Correcto',
                'El activo se agregó correctamente',
                'success'
            )
        } catch (error) {
             console.log('crearNuevoActivoAction - error: ', error);
            //Si hay un error modificar el state
            dispatch( agregarActivoError(true) )

            Swal.fire({
                icon:'error',
                title:'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            }
            )
        }
    }
}
const agregarActivo = () => ({
    type: AGREGAR_ACTIVO,
    payload: true
})

//Si el activo se guarda en la base de datos
const agregarActivoExito = activos => ({
    type: AGREGAR_ACTIVO_EXITO,
    payload: activos
})

//Si hubo un error
const agregarActivoError = estado => ({
    type: AGREGAR_ACTIVO_ERROR,
    payload: estado
})  