import React, { useEffect, useState } from 'react'
import { useDispatch ,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from "moment"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const DetalleEmpleado = () => {

    const navigate = useNavigate()
    
    //Nuevo state de producto
     const [ empleado, guardarEmpleado ] = useState({
        employee_id: '',
        first_name: '',
        last_name: '',
        cuit: '',
        team_id: '',
        join_date: '',
        rol: ''
    })

    //Empleado a editar
    const empleadoeditar = useSelector( state => state.empleados.empleadoeditar)

    //Llenar el state automaticamente
    useEffect ( ()=> {
        guardarEmpleado(empleadoeditar)
    }, [empleadoeditar])


    //Leer los datos del formulario
/*     const onChangeFormulario = e => {
        guardarEmpleado({
            ...empleado,
            [e.target.name] : e.target.value
        })
    } */

    /* const submitEditarEmpleado = (e) => {
        e.preventDefault()

        dispatch(editarEmpleadoAction(empleado))
        
        navigate('/')
    } */

    return ( 
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card style={{ maxWidth: 545, boxShadow:'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px', marginTop: 30, marginBottom: 50 }} >          
        <CardContent>
            <Grid container >
                <Grid item >
                    <Item sx={$itemsContainer}>
                        <Typography variant="h3" gutterBottom style={{ color: '#515151'}}>
                            {empleado.last_name}, {empleado.first_name}
                        </Typography>
                    </Item>
                    <Item sx={$itemsContainer}>
                        <Typography sx={{ color: 'gray', fontWeight: 'bold', paddingRight: 2 }}>
                            ID de Empleado:
                        </Typography>
                        <Typography color="textSecondary" >
                            {empleado.employee_id}
                        </Typography>
                    </Item>
                    <Item sx={$itemsContainer}>
                        <Typography sx={{ color: 'gray', fontWeight: 'bold', paddingRight: 2 }}>
                            Cuit:
                        </Typography>
                        <Typography color="textSecondary">
                            {empleado.cuit}
                        </Typography>
                    </Item>
                    <Item sx={$itemsContainer}>
                        <Typography sx={{ color: 'gray', fontWeight: 'bold', paddingRight: 2 }}>
                            Team ID:
                        </Typography>
                        <Typography color="textSecondary">
                            {empleado.team_id}
                        </Typography>
                    </Item>
                    <Item sx={$itemsContainer}>
                        <Typography sx={{ color: 'gray', fontWeight: 'bold', paddingRight: 2 }}>
                            Fecha de Ingreso:
                        </Typography>
                        <Typography color="textSecondary">
                           {empleado.join_date ? moment(empleado.join_date).format('DD-MM-YYYY') : '----'}
                        </Typography>
                    </Item>
                    <Item sx={$itemsContainer}>
                        <Typography sx={{ color: 'gray', fontWeight: 'bold', paddingRight: 2 }}>
                            Rol:
                        </Typography>
                        <Typography color="textSecondary">
                            {empleado.rol}
                        </Typography>
                    </Item>
                </Grid>   
            </Grid>     
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

//MATERAIL UI GRID
  const $itemsContainer = {
    display: "flex",
    justifyContent: "flex-start",
    boxShadow: 'none',
    padding: 1
  }
  