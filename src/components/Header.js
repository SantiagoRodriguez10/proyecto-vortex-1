import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

const Header  = () => {

    const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
            <Toolbar variant="contained" 
            sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link to={'/'} style={{ textDecoration: 'none' }}>
                <Button
                    onClick={()=> navigate('/')}
                    color="inherit"             
                    size="large"
                    sx={{ mr: 2}}>
                    <a href='/' style={{ textDecoration: "none", color: "white"}}> VORTEX
                    </a>
                </Button>
              </Link>
              <Link to={'/employees/new'} style={{ textDecoration: 'none' }}>
                <Grid container alignItems="center" justifyContent="space-between" >
                  <Button 
                      color="inherit"             
                      size="large"
                      sx={{ paddingLeft: 100}}>
                      <a href='/employees/new' style={{ textDecoration: "none", color: "white"}}>Agregar Empleado </a>
                  </Button>
                </Grid>
              </Link>
              <Link to={'/assets/new'} style={{ textDecoration: 'none' }}>
              <Grid>
                <Button 
                    color="inherit"             
                    size="large"
                    sx={{ mr: 2}}>
                    <a href='/assets/new' style={{ textDecoration: "none", color: "white"}}>Agregar Activo </a>
                </Button>
              </Grid>
              </Link>
            </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header