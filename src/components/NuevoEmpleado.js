import React from 'react'
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

function NuevoEmpleado() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ maxWidth: 545, boxShadow:'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px', marginTop: 30, marginBottom: 50 }} >
        
        <CardContent>
          <br></br>
          <h2 className='text-center mb-4 font-weight-bold' style={{ color: "#515151"}}>
            Agregar Nuevo Employee
          </h2>
          <br></br>
          <form>
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
                    id="standard-adornment-amount"
                    startAdornment={<InputAdornment position="start">$ARS</InputAdornment>}
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
                    id="standard-adornment-amount"
                    startAdornment={<InputAdornment position="start">$ARS</InputAdornment>}
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
      <Button variant="contained" endIcon={<SendIcon />}>
        Guardar
      </Button>
    </Stack>
        </CardActions>
      </Card>
    </div>
  )
}

export default NuevoEmpleado