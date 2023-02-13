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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DetalleEmpleado = () => {

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
            <div style={{ display: 'flex', justifyContent: 'center' }} >
            <Typography color="textSecondary" gutterBottom style={{ color: '#515151'}}>
                <h2>{empleado.nombre}</h2> <h2>{empleado.apellido}</h2>
            </Typography>
            </div>
            <Typography color="textSecondary" >
                ID de Empleado: <span style={{ color: '#515151'}}>{empleado.id}</span>
            </Typography>
            <br></br>
            <Typography color="textSecondary">
                Email: <span style={{ color: '#515151'}}>{empleado.email}</span>
            </Typography>
            <br></br>
            <Typography color="textSecondary">
                Telefono: <span style={{ color: '#515151'}}>{empleado.telefono}</span>
            </Typography>
            <br></br>
            <Typography color="textSecondary">
                Fecha de Ingreso: <span style={{ color: '#515151' }}>{empleado.fechaAlta}</span>
            </Typography>
            <br></br>
            <Typography color="textSecondary">
                Salario: <span style={{ color: '#515151'}}>{empleado.salario}</span>
            </Typography>
            <br></br>
            <Typography color="textSecondary">
                Comisión: <span style={{ color: '#515151'}}>%{empleado.comision}</span>
            </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }} >
            <Stack direction="row" spacing={2}>
                <Button 
                    variant="contained" 
                    color='primary' 
                    endIcon={<ArrowBackIcon />}
                    onClick={()=>navigate('/')}
                    >
                    Volver 
                </Button>
            </Stack>
        </CardActions>
        <br></br>
        </Card>
    </div>
    );
}
 
export default DetalleEmpleado