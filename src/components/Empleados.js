import React, { useEffect } from 'react'
import { CardContent, Grid, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { obtenerEmpleadosAction } from '../actions/empleadoActions';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'email',
    headerName: 'email',
    type: 'email',
    width: 160,
  },
  {
    field: 'phone_number',
    headerName: 'Phone Number',
    type: 'number',
    width: 160
  },
  {
    field: 'hireDate',
    headerName:'Hire Date',
    type: 'date',
    with: 160
  },
  {
    field: 'salary',
    headerName: 'Salary',
    type: 'number',
    width: 160
  },
  {
    field:'comission',
    headerName: 'Comission',
    type: 'number',
    with: 160
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'jon@bastard.com' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', email:'principe@encantador', hireDate: 10.02 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', hireDate: 5.09 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', hireDate: 6.08 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', hireDate: 7.10 },
  { id: 6, lastName: 'Melisandre', firstName: null, hireDate: 15.03 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', hireDate: 4.04 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', hireDate: 3.06 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', hireDate: 6.05 },
];

function Empleados() {

  const dispatch = useDispatch()

  useEffect(()=> {

    //Consultar Api
    const cargarEmpleados = () => dispatch( obtenerEmpleadosAction() );
    cargarEmpleados()

  }, [])


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h2 className='text-center mb-4 font-weight-bold' style={{ color: "#515151" }}>
            Agregar Nuevo Empleado
      </h2>
      </div>
        <Grid alignItems="center" container spacing={3}>
            <Grid item xs={6} lg={4} md={4} marginLeft={6}>
                <TextField
                  InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                  }}
                  sx={{
                    m: 0
                  }}
/*                   onChange={handleQueryChange}
                  value={query} */
                  fullWidth
                  placeholder='Buscar empleados...'
                  variant="outlined"
                />
            </Grid>
          </Grid>
          <br></br>
        <div style={{ display: 'flex', justifyContent: 'center'  }}>
        <CardContent sx={{ height: 400, width: '100%'}}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
        </CardContent>
        </div>
    </>
  )
}

export default Empleados