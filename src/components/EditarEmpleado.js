import React, { useEffect, useState } from 'react'
import { useDispatch ,useSelector } from 'react-redux';
import { editarEmpleadoAction } from '../actions/empleadoActions'
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Grid, Box, TextField } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';

const EditarEmpleado = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //Nuevo state de producto
    const [ empleado, guardarEmpleado ] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        fechaAlta: '',
        salario: '',
        comision: ''
    })

    //Empleado a editar
    const empleadoeditar = useSelector( state => state.empleados.empleadoeditar)

    //Llenar el state automaticamente
    useEffect ( ()=> {
        guardarEmpleado(empleadoeditar)
    }, [empleadoeditar])


    //Leer los datos del formulario
    const onChangeFormulario = e => {
        guardarEmpleado({
            ...empleado,
            [e.target.name] : e.target.value
        })
    }

    const submitEditarEmpleado = (e) => {
        e.preventDefault()

        dispatch(editarEmpleadoAction(empleado))
        
        navigate('/')
    }

    return ( 
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card style={{ maxWidth: 545, boxShadow:'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px', marginTop: 30, marginBottom: 50 }} >
          
          <CardContent>
            <br></br>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h2 className='text-center mb-4 font-weight-bold' style={{ color: "#515151"}}>
              Editar Empleado
            </h2>
            </div>
            <br></br>
                <form onSubmit={submitEditarEmpleado}>
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
                                    name="nombre"
                                    placeholder= 'Nombre del empleado'
                                    variant="outlined"
                                    value={empleado.nombre}
                                    onChange={onChangeFormulario}
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
                                    name="apellido"
                                    placeholder= 'Apellido del empleado'
                                    variant="outlined"
                                    value={empleado.apellido}
                                    onChange={onChangeFormulario}
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
                                    placeholder= 'Email del empleado'
                                    variant="outlined"
                                    value={empleado.email}
                                    onChange={onChangeFormulario}
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <Box pb={1}>
                                <Typography>Teléfono:</Typography>
                                </Box>
                                <TextField
                                    type="tel"
                                    fullWidth
                                    required
                                    name="telefono"
                                    placeholder= 'Teléfono del empleado'
                                    variant="outlined"
                                    value={empleado.telefono}
                                    onChange={onChangeFormulario}
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <Box pb={1}>
                                <Typography>Fecha de Alta:</Typography>
                                </Box>
                                <TextField
                                    type="date"
                                    fullWidth
                                    required
                                    name="fechaAlta"
                                    placeholder= 'Fecha de alta'
                                    variant="outlined"
                                    value={empleado.fechaAlta}
                                    onChange={onChangeFormulario}
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <Box pb={1}>
                                <Typography>Salario:</Typography>
                                </Box>
                                <TextField
                                    type="number"
                                    fullWidth
                                    required
                                    name="salario"
                                    placeholder= 'Salario'
                                    variant="outlined"
                                    value={empleado.salario}
                                    onChange={onChangeFormulario}
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <Box pb={1}>
                                <Typography>Comisión:</Typography>
                                </Box>
                                <TextField
                                    type="number"
                                    fullWidth
                                    required
                                    name="comision"
                                    placeholder= 'Comisión'
                                    variant="outlined"
                                    value={empleado.comision}
                                    onChange={onChangeFormulario}
                                />
                            </Grid>
                            <br></br>
                            <br></br>
                            </Grid>
                            </Box>
                        </form>
                        </CardContent>
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
                                <Button 
                                    variant="contained" 
                                    endIcon={<SendIcon />}
                                    onClick={submitEditarEmpleado}
                                    >
                                    Editar
                                </Button>
                            </Stack>
                        </CardActions>
                        <br></br>
        </Card>
    </div>
    );
}
 
export default EditarEmpleado