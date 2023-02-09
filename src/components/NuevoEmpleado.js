import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Grid, Box, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { maxWidth } from '@mui/system';

//Actions de Redux 
import { crearNuevoEmpleadoAction } from '../actions/empleadoActions.js'

function NuevoEmpleado() {

  //State del componente
  const [ nombre, guardarNombre ] = useState('')
  const [ apellido, guardarApellido ] = useState('')
  const  [email, guardarEmail ] = useState('')
  const [ telefono, guardarTelefono ] = useState(0)
  const [ fechaAlta, guardarFechaAlta]  = useState('')
  const[ salario, guardarSalario ] = useState(0)
  const[ comision, guardarComision ] = useState(0)
  
  //Funcion dispatch para componente
  const dispatch = useDispatch()

  //Mandar a llamar  al action de productoAction
  const agregarEmpleado = empleado => dispatch( crearNuevoEmpleadoAction(empleado) )

  //Cuando el usuario haga submit
  const submitNuevoEmpleado = e => {
      e.preventDefault()


      //Validar formulario
      if( nombre.trim() === '' || 
          apellido.trim() === '' || 
          email.trim() === '' || 
          telefono <= 0 ||
          fechaAlta === null ||
          salario === 0 ||
          comision === 0
          ){
            return
          }
      //Si no hay errores

      //Crear el nuevo empleado
      agregarEmpleado({
        nombre,
        apellido,
        email,
        telefono,
        fechaAlta,
        salario,
        comision
      })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ maxWidth: 545, boxShadow:'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px', marginTop: 30, marginBottom: 50 }} >
        
        <CardContent>
          <br></br>
          <h2 className='text-center mb-4 font-weight-bold' style={{ color: "#515151"}}>
            Agregar Nuevo Empleado
          </h2>
          <br></br>
          <form onSubmit={submitNuevoEmpleado}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
              <Grid item xs={12} md={12}>
                <Box pb={1}>
                <Typography>Nombre:</Typography>
                </Box>
                  <TextField
                    type="text"
                    fullWidth
                    required
                    name="name"
                    placeholder= 'Nombre del empleado'
                    variant="outlined"
                    value={nombre}
                    onChange={e=> guardarNombre(e.target.value)}
                  />
              </Grid>
              <Grid item xs={12} md={12}>
                <Box pb={1}>
                  <Typography>Apellido:</Typography>
                </Box>
                  <TextField
                    type="text"
                    fullWidth
                    required
                    name="lastname"
                    placeholder='Apellido del empleado'
                    variant="outlined"
                    value={apellido}
                    onChange={e=> guardarApellido(e.target.value)}
                  />
              </Grid>
              <Grid item xs={12} md={12}>
                <Box pb={1}>
                <Typography>Email:</Typography>
                </Box>
                <TextField
                    type="email"
                    fullWidth
                    required
                    name="email"
                    placeholder='Email del empleado'
                    variant="outlined"
                    value={email}
                    onChange={e=> guardarEmail(e.target.value)}
                  />
              </Grid>
              <Grid item xs={12} md={12}>
                <Box pb={1}>
                <Typography>Teléfono:</Typography>
                </Box>
                  <TextField
                    type="tel"
                    fullWidth
                    name="phone_number"
                    placeholder='Teléfono del empleado'
                    variant="outlined"
                    value={telefono}
                    onChange={e=> guardarTelefono(Number(e.target.value))}
                  />
              </Grid>
              <Grid item xs={12} md={12}>
                <Box pb={1}>
                <Typography>Fecha de alta:</Typography>
                </Box>
                <TextField
                    type="date"
                    fullWidth
                    name="hire_date"
                    placeholder='Fecha de alta del empleado'
                    variant="outlined"
                    value={fechaAlta}
                    onChange={e=> guardarFechaAlta(e.target.value)}
                  />
              </Grid>
              <Grid item xs={12} md={12}>
                <Box pb={1}>
                </Box>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <Box pb={1}>
                <Typography>Salario:</Typography>
                </Box>
                  <Input
                    type='number'
                    id="standard-adornment-amount"
                    startAdornment={<InputAdornment position="start">$ARS</InputAdornment>}
                    value={salario}
                    onChange={e=> guardarSalario(Number(e.target.value))}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <Box pb={1}>
                </Box>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <Box pb={1}>
                <Typography>Comisión:</Typography>
                </Box>
                  <Input
                    type='number'
                    id="standard-adornment-amount"
                    startAdornment={<InputAdornment position="start">$ARS</InputAdornment>}
                    value={comision}
                    onChange={e=> guardarComision(Number(e.target.value))}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          </form>
        </CardContent>
        <br></br>
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }} >
        <Stack direction="row" spacing={2}>
      <Button onClick={submitNuevoEmpleado} variant="contained" endIcon={<SendIcon />}>
        Guardar Nuevo Empleado
      </Button>
    </Stack>
        </CardActions>
      </Card>
    </div>
  )
}

export default NuevoEmpleado