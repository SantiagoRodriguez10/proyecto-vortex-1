import React from 'react'
import { Link } from 'react-router-dom';

const Empleado = ({empleado}) => {
    const { nombre, apellido, email, telefono, fechaAlta, salario, comision } = empleado
    return ( 
        <tr>
            <td> {nombre} </td>
            <td> {apellido} </td>
            <td> {email} </td>
            <td> {telefono} </td>
            <td> {fechaAlta} </td>
            <td> {salario} </td>
            <td> {comision} </td>
        </tr>
     );
}
 
export default Empleado;