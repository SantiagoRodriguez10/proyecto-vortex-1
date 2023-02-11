import React, { useEffect } from 'react'
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from '@mui/material';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { obtenerEmpleadosAction } from '../actions/empleadoActions';


function Empleados() {

  const dispatch = useDispatch()

  useEffect(()=> {

    //Consultar Api
    const cargarEmpleados = () => dispatch( obtenerEmpleadosAction() );
    cargarEmpleados()

  }, [])  

  //Obtener el State
  const empleados = useSelector( state => state.empleados.empleados )
  const error = useSelector(state => state.empleados.error)
  
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h2 className='text-center mb-4 font-weight-bold' style={{ color: "#515151" }}>
            Agregar Nuevo Empleado
      </h2>
      </div>
          <>
          <br></br>
        <div style={{ display: 'flex', justifyContent: 'center'  }}>
        <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>ID</TableCell>
                    <TableCell align='center'>NOMBRE</TableCell>
                    <TableCell align='center'>APELLIDO</TableCell>
                    <TableCell align='center'>EMAIL</TableCell>
                    <TableCell align='center'>TELEFONO</TableCell>
                    <TableCell align='center'>FECHA DE ALTA</TableCell>
                    <TableCell align='center'>SALARIO</TableCell>
                    <TableCell align='center'>COMISIÓN</TableCell>
                    <TableCell align='center'>ACCIÓN</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {empleados.map((row) => (
                    <TableRow
                      key={row.id}
                      hover>
                      <TableCell align='center' component='th' scope='row'>
                        {row.id}
                      </TableCell>
                      <TableCell align='center' component='th' scope='row'>
                        {row.nombre}
                      </TableCell>
                      <TableCell align='center' component='th' scope='row'>
                        {row.apellido}
                      </TableCell>
                      <TableCell align='center'>
                        {row.email}
                      </TableCell>
                      <TableCell align='center'>
                        {row.telefono}
                      </TableCell>
                      <TableCell align='center'>
                        {row.fechaAlta}
                      </TableCell>
                      <TableCell align='center'>
                        ${row.salario}
                      </TableCell>
                      <TableCell align='center'>
                          <div style={{ display: 'flex', justifyContent: 'center'}} >
                            <Chip 
                              size="small" 
                              color="primary" 
                              value={row.comision} 
                              label={`% ${row.comision}`}
                            /> 
                          </div>
                      </TableCell>

                      {/* botones de accion, editar y eliminar */}

                      <TableCell align='center'>
                      <Button>
                        <Link to={`/employees/edit/${row.id}`} >
                        <EditIcon
                          style={{ color: '#ffba00' }}
                        />
                        </Link>
                      </Button>
                      <Button>
                      <DeleteIcon
                         style={{ color: '#ff6961' }}
                        />
                      </Button>
                      </TableCell>

                    </TableRow>
                  ))}

                </TableBody>
              </Table>
            </TableContainer>
        </div>

        <br></br>            
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Stack spacing={2}>
          <Pagination count={5} defaultPage={1} color="primary" />
        </Stack>
        </div>
        <br></br>
    </>
    </>
  )
}

export default Empleados