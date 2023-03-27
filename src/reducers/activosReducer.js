import {
    AGREGAR_ACTIVO,
    AGREGAR_ACTIVO_EXITO,
    AGREGAR_ACTIVO_ERROR,
    COMENZAR_DESCARGA_ACTIVOS,
    DESCARGA_ACTIVOS_EXITO,
    DESCARGA_ACTIVOS_ERROR,
    OBTENER_ACTIVO_EDITAR,
    ACTIVO_EDITADO_EXITO,
    OBTENER_ACTIVO_ELIMINAR,
    ACTIVO_ELIMINADO_EXITO,
    ACTIVO_ELIMINADO_ERROR
} from '../types/activos'


const initialState = {
    activos: [],
    error : null,
    loading: false,
    activoeliminar: null,
    activoeditar: null
}

export default function( state = initialState, action ) {
    switch(action.type) {
        case COMENZAR_DESCARGA_ACTIVOS:
        case AGREGAR_ACTIVO:
            return {
                ...state,
                loading: action.payload
            }
        case AGREGAR_ACTIVO_EXITO:
            return {
                ...state,
                loading: false,
                activos: [...state.activos, action.payload]
            }
        case AGREGAR_ACTIVO_ERROR:
        case DESCARGA_ACTIVOS_ERROR:
        case ACTIVO_ELIMINADO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DESCARGA_ACTIVOS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                activos: action.payload
            }
            case OBTENER_ACTIVO_EDITAR:
                return {
                    ...state,
                    activoeditar: action.payload
                }
            case ACTIVO_EDITADO_EXITO:
                return {
                    ...state,
                    activoeditar: null,
                    activos: state.activos.map( activos =>
                        activos.assets_id === action.payload.assets_id ? action.payload : activos
                    )
                }
            case OBTENER_ACTIVO_ELIMINAR:
                return {
                    ...state,
                    activoeliminar: action.payload
                }
            case ACTIVO_ELIMINADO_EXITO:
                return {
                    ...state,
                    activos: state.activos.filter( activos => activos !== state.activoeliminar ),
                    activoeliminar: null
                }
        
        default:
            return state
    }
}