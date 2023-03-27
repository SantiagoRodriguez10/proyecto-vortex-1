import React from 'react'
import { useNavigate } from 'react-router-dom';
//Redux
import { useDispatch } from 'react-redux';
import { obtenerEmpleadoEditar } from '../actions/empleadoActions';

const Empelado = ({empleado}) => {
    const {first_name, last_name, employee_id, cuit, team_id, join_date, rol } = empleado

    const dispatch = useDispatch()
    const navigate = useNavigate()//Habilitar history para redirección

    //Funcion que redirige de forma programada
    const redireccionarEdicion = empleado => {
        dispatch( obtenerEmpleadoEditar(empleado) )
        navigate(`/employees/edit/${empleado.employee_id}`)
    }

    return ( 
        <tr>
            <td>{first_name}</td>
            <td><span className='font-weight-bold'>${employee_id}</span></td>
            <td><span className='font-weight-bold'>${first_name}</span></td>
            <td><span className='font-weight-bold'>${last_name}</span></td>
            <td><span className='font-weight-bold'>${cuit}</span></td>
            <td><span className='font-weight-bold'>${join_date}</span></td>
            <td><span className='font-weight-bold'>${team_id}</span></td>
            <td><span className='font-weight-bold'>${rol}</span></td>
            <td className='acciones'>
                <button 
                    type='button' 
                    onClick={ () => redireccionarEdicion(empleado) }
                    className='btn btn-primary mr-2'> 
                    Editar
                </button>
            </td>
        </tr>
     );
}
 
export default Empelado