import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

//Redux
import { useDispatch } from 'react-redux';
import { obtenerEmpleadoEditar } from '../actions/empleadoActions';

const Producto = ({empleado}) => {
    const {nombre, apellido, email, telefono, fechaAlta, salario, comision, id} = empleado

    const dispatch = useDispatch()
    const navigate = useNavigate()//Habilitar history para redirección

    //Confirmar si queres eliminarlo
/*     const confirmarEliminarProducto = id => {

        //Preguntar al usuario
        Swal.fire({
            title: '¿Estás Seguro?',
            text: "Un Producto que se elimina no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                //Pasarlo al action
            dispatch(borrarProductoAction(id))
            }
          })
    } */

    //Funcion que redirige de forma programada
    const redireccionarEdicion = empleado => {
        dispatch( obtenerEmpleadoEditar(empleado) )
        navigate(`/employees/edit/${empleado.id}`)
    }

    return ( 
        <tr>
            <td>{nombre}</td>
            <td><span className='font-weight-bold'>${apellido}</span></td>
            <td><span className='font-weight-bold'>${email}</span></td>
            <td><span className='font-weight-bold'>${telefono}</span></td>
            <td><span className='font-weight-bold'>${fechaAlta}</span></td>
            <td><span className='font-weight-bold'>${salario}</span></td>
            <td><span className='font-weight-bold'>${comision}</span></td>
            <td className='acciones'>
                <button 
                    type='button' 
                    onClick={ () => redireccionarEdicion(empleado) }
                    className='btn btn-primary mr-2'> 
                    Editar
                </button>
{/*                 <btn
                    type='button'
                    className='btn btn-danger'
                    onClick={() => confirmarEliminarProducto(id)}
                >Eliminar</btn> */}
            </td>
        </tr>
     );
}
 
export default Producto