import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Grid, Box, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CancelIcon from '@mui/icons-material/Cancel';


//Actions de Redux 
import { crearNuevoEmpleadoAction } from '../actions/empleadoActions.js'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function NuevoEmpleado() {

  const navigate = useNavigate()

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

  //Accedo al state del store con useSelector
  const cargando = useSelector(state => state.empleados.loading)
  const error = useSelector(state => state.empleados.error)

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
      
      //Redireccionar
      navigate('/')

      //Error 
      handleClick()

      
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ maxWidth: 545, boxShadow:'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px', marginTop: 30, marginBottom: 50 }} >
        
        <CardContent>
          <br></br>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h2 className='text-center mb-4 font-weight-bold' style={{ color: "#515151"}}>
            Agregar Nuevo Empleado
          </h2>
          </div>
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
                    startAdornment={<InputAdornment position="start">%</InputAdornment>}
                    value={comision}
                    onChange={e=> guardarComision(Number(e.target.value))}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          </form>
          {cargando ? <p>Cargando...</p> : null}
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}> 
            {error ? <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                      Hubo un error al crear el empleado!
                    </Alert>
            : null}
            </Snackbar>
          </Stack>
        </CardContent>
        <br></br>
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }} >
        <Stack direction="row" spacing={2}>
          <Button 
            variant="contained" 
            color='error' 
            endIcon={<CancelIcon />}
            onClick={()=>navigate('/')}
            >
            Cancelar 
        </Button>
        <Button onClick={submitNuevoEmpleado} variant="contained" endIcon={<SendIcon />}>
          Guardar Nuevo Empleado
        </Button>
      </Stack>
        </CardActions>
      <br></br>
      </Card>
    </div>
  )
}

export default NuevoEmpleado