import React, { useState } from 'react';
import empleadoAxios from './../config/axios'
import { TextField, Select, MenuItem, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

function EmployeeFilter() {
  const [rol, setRol] = useState('');
  const [employees, setEmployees] = useState([]);

  const handleRolChange = (event) => {
    setRol(event.target.value);
  };

  const handleFilterClick = async () => {
    try {
        const respuesta = await empleadoAxios.get('/api/employees/filter?rol=${rol}', {
            headers: {
                'Content-Type': 'application/json'
            }
        }) ;
      setEmployees(respuesta.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <TextField label="Rol" value={rol} onChange={handleRolChange} />
        <button onClick={handleFilterClick}>Filtro</button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.employee_id}>
              <TableCell>{employee.first_name}</TableCell>
              <TableCell>{employee.rol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default EmployeeFilter;