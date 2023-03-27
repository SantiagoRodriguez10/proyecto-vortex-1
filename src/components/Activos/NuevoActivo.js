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
import { crearNuevoActivoAction } from '../../actions/activosAction.js';

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


function NuevoActivo() {

  const navigate = useNavigate()

  //State del componente
  const [ name, guardarNombre ] = useState('')
  const [ type, guardarType ] = useState('')
  const  [code, guardarCode ] = useState()
  const [ marca, guardarMarca]  = useState('')
  const [ description, guardarDescription ] = useState('')
  const[ purchase_date, guardarFecha ] = useState('')
  const[ employee_id, guardarEmployeeId ] = useState()
  
  //Funcion dispatch para componente
  const dispatch = useDispatch()

  //Accedo al state del store con useSelector
  const cargando = useSelector(state => state.activos.loading)
  const error = useSelector(state => state.activos.error)
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
  const agregarActivo = activos => 
  dispatch( crearNuevoActivoAction(activos),
  )

  
  //Cuando el usuario haga submit
  const submitNuevoActivo = e => {
      e.preventDefault()
      agregarActivo({
        name,
        type,
        code,
        marca,
        description,
        purchase_date,
        employee_id
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
                  Agregar Nuevo Activo
                  </Typography>
              </Item>
              <br></br>
                {alerta ? <p className={alerta.classes}>
                  <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert severity="warning"> Cuidado! — Todos los campos son obligatorios</Alert>
                  </Stack>
              </p> : null}
            <form onSubmit={submitNuevoActivo}>
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
                      name="name"
                      placeholder= 'Nombre del activo'
                      variant="outlined"
                      value={name}
                      onChange={e=> guardarNombre(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box pb={1}>
                    <Typography sx={$inputTittle}>Tipo</Typography>
                  </Box>
                    <TextField
                      type="text"
                      fullWidth
                      required
                      name="type"
                      placeholder='Tipo de activo'
                      variant="outlined"
                      value={type}
                      onChange={e=> guardarType(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box pb={1}>
                  <Typography sx={$inputTittle}>Código</Typography>
                  </Box>
                  <TextField
                      type="number"
                      fullWidth
                      required
                      name="code"
                      placeholder='Código del activo'
                      variant="outlined"
                      value={code}
                      onChange={e=> guardarCode(Number(e.target.value))}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box pb={1}>
                  <Typography sx={$inputTittle}>ID del Empleado</Typography>
                  </Box>
                  <TextField
                      type="number"
                      fullWidth
                      required
                      name="employee_id"
                      placeholder='ID del Empleado'
                      variant="outlined"
                      value={employee_id}
                      onChange={e=> guardarEmployeeId(Number(e.target.value))}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box pb={1}>
                  <Typography sx={$inputTittle}>Marca</Typography>
                  </Box>
                    <TextField
                      type="text"
                      fullWidth
                      name="marca"
                      placeholder='Marca del activo'
                      variant="outlined"
                      value={marca}
                      onChange={e=> guardarMarca(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box pb={1}>
                    <Typography sx={$inputTittle}>Descripción</Typography>
                  </Box>
                    <TextField
                      type="text"
                      fullWidth
                      required
                      name="description"
                      placeholder='Descripción del activo'
                      variant="outlined"
                      value={description}
                      onChange={e=> guardarDescription(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box pb={1}>
                  <Typography sx={$inputTittle}>Fecha de alta</Typography>
                  </Box>
                  <TextField
                      type="date"
                      fullWidth
                      name="purchase_date"
                      placeholder='Fecha de compra del activo'
                      variant="outlined"
                      value={purchase_date}
                      onChange={e=> guardarFecha(e.target.value)}
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
        <Button onClick={submitNuevoActivo} variant="contained" endIcon={<SendIcon />}>
          Guardar Nuevo Activo
        </Button>
      </Stack>
        </CardActions>
      <br></br>
      </Card>
    </div>
  )
}

export default NuevoActivo

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