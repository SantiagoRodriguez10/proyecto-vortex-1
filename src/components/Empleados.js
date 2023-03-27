//React
import React, { useEffect } from 'react'
//MaterialUI
import { 
  TableContainer, 
  Table, 
  TableHead, 
  TableCell, 
  TableRow, 
  TableBody,
  Paper,
  Button,
  Chip,
  Stack,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
  Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import moment from "moment"
//SWAL2
import Swal from 'sweetalert2';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { obtenerEmpleadosAction, borrarEmpleadoAction, obtenerEmpleadoEditar } from '../actions/empleadoActions';


function Empleados({empleado}) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  //Material UI ToggleButton
  const [alignment, setAlignment] = React.useState('web');
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(()=> {

    //Consultar Api
    const cargarEmpleados = () => dispatch( obtenerEmpleadosAction() );
    cargarEmpleados()

  }, [])  

  //Obtener el State
  const empleados = useSelector( state => state.empleados.empleados )
  const error = useSelector(state => state.empleados.error)
  //Funcion que redirige de forma programada
  const redireccionarEdicion = empleado => {
    dispatch( obtenerEmpleadoEditar(empleado) )
    navigate(`/employees/edit/${empleado.employee_id}`)
}

const redireccionarDetalle = empleado => {
  dispatch( obtenerEmpleadoEditar(empleado) )
  navigate(`/employees/detail/${empleado.employee_id}`) 
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
          Swal.fire(
            '¡Eliminado!',
            'Su empleado ha sido eliminado correctamente.',
            'success'
          )
          dispatch( borrarEmpleadoAction(empleado) )
          window.location.reload() 
        }
    })
  }

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
          <h2 className='text-center mb-4 font-weight-bold' style={{ color: "#515151", paddingLeft:530}}>
                Lista de Empleados
          </h2>
        <Grid sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 8, paddingTop: 2}}>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            sx={{ alignSelf: "center" }}
          >
            <ToggleButton sx={{fontWeight: 'bold', borderWidth: 2}} value="web">Empleados</ToggleButton>
            <ToggleButton sx={{fontWeight: 'bold'}} value="android">Activos</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
  
          <>
          <br></br>
        <div style={{ display: 'flex', justifyContent: 'center'  }}>
        <TableContainer component={Paper}>
              <Table sx={$tableCells}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={$tableCells} align='center'>ID</TableCell>
                    <TableCell sx={$tableCells} align='center'>NOMBRE</TableCell>
                    <TableCell sx={$tableCells} align='center'>APELLIDO</TableCell>
                    <TableCell sx={$tableCells} align='center'>CUIT</TableCell>
                    <TableCell sx={$tableCells} align='center'>FECHA DE ALTA</TableCell>
                    <TableCell sx={$tableCells} align='center'>TEAM ID</TableCell>
                    <TableCell sx={$tableCells} align='center'>ROL</TableCell>
                    <TableCell sx={$tableCells} align='center'>ACCIONES</TableCell>
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
                      key={row.employee_id}
                      hover>
                      <TableCell align='center' component='th' scope='row'>
                        {row.employee_id}
                      </TableCell>
                      <TableCell align='center' component='th' scope='row'>
                        {row.first_name}
                      </TableCell>
                      <TableCell align='center' component='th' scope='row'>
                        {row.last_name}
                      </TableCell>
                      <TableCell align='center'>
                        {row.cuit}
                      </TableCell>
                      <TableCell align='center'>
                        {row.join_date ? moment(row.join_date).format('DD-MM-YYYY') : '----'}
                      </TableCell>
                      <TableCell align='center'>
                        {row.team_id}
                      </TableCell>
                      <TableCell align='center'>
                        <div style={{ display: 'flex', justifyContent: 'center'}} >
                          <Stack direction="row" spacing={1}>
                            <Chip 
                              icon={<PermIdentityIcon />}
                              value={row.rol} 
                              label={row.rol}
                              color="primary" 
                              variant="outlined"
                            />
                          </Stack>
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
                         onClick={()=> confirmarEliminarEmpleado(row.employee_id)}
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

const $tableCells = {
  fontWeight: 'bold', 
  color: "#515151",
  fontSize: 15
}