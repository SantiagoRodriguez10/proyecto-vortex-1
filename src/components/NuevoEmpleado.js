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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

//Actions de Redux 
import { crearNuevoEmpleadoAction } from '../actions/empleadoActions.js'


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function NuevoEmpleado() {

  const navigate = useNavigate()

  //State del componente
  const [ first_name, guardarNombre ] = useState('')
  const [ last_name, guardarApellido ] = useState('')
  const  [cuit, guardarCuit ] = useState(0)
  const [ join_date, guardarFechaAlta]  = useState('')
  const [ team_id, guardarTeamId ] = useState(0)
  const[ rol, guardarRol ] = useState('')
  
  //Funcion dispatch para componente
  const dispatch = useDispatch()

  //Accedo al state del store con useSelector
  const cargando = useSelector(state => state.empleados.loading)
  const error = useSelector(state => state.empleados.error)
  const alerta = useSelector(state => state.alerta.alerta)
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
  const agregarEmpleado = empleado => 
  dispatch( crearNuevoEmpleadoAction(empleado),
  )

  
  //Cuando el usuario haga submit
  const submitNuevoEmpleado = e => {
      e.preventDefault()
      agregarEmpleado({
        first_name,
        last_name,
        cuit,
        join_date,
        team_id,
        rol
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
          <Grid container >
            <Grid item >
              <Item sx={$itemsContainer}>
                  <Typography variant="h4" gutterBottom sx={$addEmployeeTittle}>
                  Agregar Nuevo Empleado
                  </Typography>
              </Item>
              <br></br>
                {alerta ? <p className={alerta.classes}>
                  <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert severity="warning"> Cuidado! — Todos los campos son obligatorios</Alert>
                  </Stack>
              </p> : null}
            <form onSubmit={submitNuevoEmpleado}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
                <Grid item xs={12} md={12}>
                  <Box pb={1}>
                  <Typography sx={$inputTittle}>Nombre</Typography>
                  </Box>
                    <TextField
                      type="text"
                      fullWidth
                      required
                      name="first_name"
                      placeholder= 'Nombre del empleado'
                      variant="outlined"
                      value={first_name}
                      onChange={e=> guardarNombre(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box pb={1}>
                    <Typography sx={$inputTittle}>Apellido</Typography>
                  </Box>
                    <TextField
                      type="text"
                      fullWidth
                      required
                      name="last_name"
                      placeholder='Apellido del empleado'
                      variant="outlined"
                      value={last_name}
                      onChange={e=> guardarApellido(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box pb={1}>
                  <Typography sx={$inputTittle}>Cuit</Typography>
                  </Box>
                  <TextField
                      type="text"
                      fullWidth
                      required
                      name="cuit"
                      placeholder='Cuit del empleado'
                      variant="outlined"
                      value={cuit}
                      onChange={e=> guardarCuit(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box pb={1}>
                  <Typography sx={$inputTittle}>Fecha de alta</Typography>
                  </Box>
                  <TextField
                      type="date"
                      fullWidth
                      name="join_date"
                      placeholder='Fecha de alta del empleado'
                      variant="outlined"
                      value={join_date}
                      onChange={e=> guardarFechaAlta(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box pb={1}>
                  <Typography sx={$inputTittle}>Team ID</Typography>
                  </Box>
                    <TextField
                      type="number"
                      fullWidth
                      name="team_id"
                      placeholder='Team ID'
                      variant="outlined"
                      value={team_id}
                      onChange={e=> guardarTeamId(Number(e.target.value))}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box pb={1}>
                    <Typography sx={$inputTittle}>Rol</Typography>
                  </Box>
                    <TextField
                      type="text"
                      fullWidth
                      required
                      name="rol"
                      placeholder='Rol del empleado'
                      variant="outlined"
                      value={rol}
                      onChange={e=> guardarRol(e.target.value)}
                    />
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
          </Grid>
        </Grid>
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

//MATERAIL UI GRID

const $itemsContainer = {
  display: "flex",
  justifyContent: "center",
  boxShadow: 'none',
  padding: 1
}
const $addEmployeeTittle = {
  color: '#515151',
  display: 'flex',
  justifyContent: 'center'
}
const $inputTittle = {
  color: '#515151',
  fontWeight: 'bold'
}