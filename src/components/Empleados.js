import React, { useEffect } from 'react'
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from '@mui/material';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
//SWAL2
import Swal from 'sweetalert2';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { obtenerEmpleadosAction, borrarEmpleadoAction, obtenerEmpleadoEditar } from '../actions/empleadoActions';


function Empleados({empleado}) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=> {

    //Consultar Api
    const cargarEmpleados = () => dispatch( obtenerEmpleadosAction() );
    cargarEmpleados()

  }, [])  

  //Obtener el State
  const empleados = useSelector( state => state.empleados.empleados )
  const error = useSelector(state => state.empleados.error)
  console.log('empleados: ', empleados);

  //Funcion que redirige de forma programada
  const redireccionarEdicion = empleado => {
    dispatch( obtenerEmpleadoEditar(empleado) )
    navigate(`/employees/edit/${empleado.id}`) 
    console.log('empleado: ', empleado);
}

const redireccionarDetalle = empleado => {
  dispatch( obtenerEmpleadoEditar(empleado) )
  navigate(`/employees/detail/${empleado.id}`) 
  console.log('empleado: ', empleado);
}
  
  //Confirmar si desea eliminar
  const confirmarEliminarEmpleado = empleado => {
    //Preguntar al usuario
    Swal.fire({
          title: 'Estás seguro?',
          text: "Una vez eliminado no se puede recuperar!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!',
          cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
          //Pasar al action
          dispatch( borrarEmpleadoAction(empleado) )
        }
    }).then(() => {
      window.location.href = window.location.href
    })

    
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h2 className='text-center mb-4 font-weight-bold' style={{ color: "#515151" }}>
            Lista de Empleados
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
                    <TableCell align='center'>ACCIONES</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {empleados.length === 0 ?
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert severity="error">
                    No hay ningún empleado — <strong> Agrega uno!</strong>
                  </Alert>
                  </Stack>
                </div>
                : ( 
                  empleados.map((row) => (
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
                        <EditIcon
                          style={{ color: '#ffba00' }}
                          onClick={ () => redireccionarEdicion(row) }
                        />
                      </Button>
                      <Button>
                        <RemoveRedEyeIcon
                          style={{ color: '#729d7e' }}
                          onClick={ () => redireccionarDetalle(row) }
                        />
                      </Button>
                      <Button>
                      <DeleteIcon
                         style={{ color: '#ff6961' }}
                         onClick={()=> confirmarEliminarEmpleado(row.id)}
                        />
                      </Button>
                      </TableCell>

                    </TableRow>
                ))
              )}
                </TableBody>
              </Table>
            </TableContainer>
        </div>
    </>
    </>
    
  )
}

export default Empleados