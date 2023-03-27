import React, { useEffect, useState } from 'react'
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
  Stack,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment"
//SWAL2
import Swal from 'sweetalert2';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { obtenerActivosAction, borrarActivoAction } from '../../actions/activosAction';
import FilterActivos from './FilterActivos'

function Activos() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=> {

    //Consultar Api
    const cargarActivos = () => dispatch( obtenerActivosAction() );
    cargarActivos()

  }, [])  

  //Obtener el State
  const activos = useSelector( state => state.activos.activos)
  const error = useSelector(state => state.activos.error)
  const [filteredEmployees, setFilteredActives] = useState([]);

  const updateFilteredAssets = async (type) => {
    const response = await fetch(`/api/assets/filter?type=${type}`);
    const data = await response.json();
    setFilteredActives(data);
  };
  const confirmarEliminarActivo = activos => {
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
            'Su activo ha sido eliminado correctamente.',
            'success'
          )
          dispatch( borrarActivoAction(activos) )
          window.location.reload() 
        }
    })
  }

  return (
    <>
        <br></br>
        <FilterActivos onChange={updateFilteredAssets}/>
        <div style={{ display: 'flex', justifyContent: 'center'  }}>
        <TableContainer component={Paper}>
                <Table sx={$tableCells}>
                <TableHead>
                    <TableRow>
                    <TableCell sx={$tableCells} align='center'>ID</TableCell>
                    <TableCell sx={$tableCells} align='center'>NOMBRE</TableCell>
                    <TableCell sx={$tableCells} align='center'>TIPO</TableCell>
                    <TableCell sx={$tableCells} align='center'>CÓDIGO</TableCell>
                    <TableCell sx={$tableCells} align='center'>MARCA</TableCell>
                    <TableCell sx={$tableCells} align='center'>FECHA DE COMPRA</TableCell>
                    <TableCell sx={$tableCells} align='center'>DESCRIPCIÓN</TableCell>
                    <TableCell sx={$tableCells} align='center'>ACCIONES</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {activos.length === 0 ?
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">
                    No hay ningún activo — <strong> Agrega uno!</strong>
                    </Alert>
                    </Stack>
                </div>
                : ( 
                    activos.map((row) => (
                    <TableRow
                        key={row.assets_id}
                        hover>
                        <TableCell align='center' component='th' scope='row'>
                        {row.assets_id}
                        </TableCell>
                        <TableCell align='center' component='th' scope='row'>
                        {row.name}
                        </TableCell>
                        <TableCell align='center' component='th' scope='row'>
                        {row.type}
                        </TableCell>
                        <TableCell align='center'>
                        {row.code}
                        </TableCell>
                        <TableCell align='center'>
                        {row.marca}
                        </TableCell>
                        <TableCell align='center'>
                        {row.purchase_date ? moment(row.join_date).format('DD-MM-YYYY') : '----'}
                        </TableCell>
                        <TableCell align='center'>
                        {row.description}
                        </TableCell>
                        
                        {/* botones de accion, editar y eliminar */}

                    <TableCell align='center'>
                        <Button>
                        <DeleteIcon
                        style={{ color: '#ff6961' }}
                        onClick={()=> confirmarEliminarActivo(row.assets_id)}
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
)}

export default Activos

const $tableCells = {
  fontWeight: 'bold', 
  color: "#515151",
  fontSize: 15
}