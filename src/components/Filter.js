import React, { useState } from 'react';
import empleadoAxios from './../config/axios'
import { TextField, Select, MenuItem, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

function EmployeeFilter() {
  const [rol, setRol] = useState('');
  const [employees, setEmployees] = useState([]);

  const handleRolChange = (event) => {
    setRol(event.target.value);
  };

  const handleFilterClick = async () => {
    try {
        const respuesta = await empleadoAxios.get(`/api/employees/filter?rol=${rol || ""}`, {
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
    <div >
      <div style={{ paddingLeft: 70 }}>
        <TextField label="Rol" value={rol} onChange={handleRolChange} />
            <Button onClick={handleFilterClick} variant="contained" endIcon={<SendIcon />}>
                Filtrar Empleado
            </Button>
      </div>
      <Table sx={{ paddingLeft: 70 }}>
        <TableHead sx={{ paddingLeft: 70 }}>
          <TableRow>
            <TableCell>Empleado</TableCell>
            <TableCell>Rol</TableCell>
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