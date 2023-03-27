import React, { useState } from 'react';
import empleadoAxios from '../../config/axios';
import { TextField, Select, MenuItem, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Grid } from '@mui/material';

function ActiveFilter() {
  const [type, setType] = useState('');
  const [actives, setActives] = useState([]);

  const handleRolChange = (event) => {
    setType(event.target.value);
  };

  const handleFilterClick = async () => {
    try {
        const respuesta = await empleadoAxios.get(`/api/assets/filter?type=${type || ""}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }) ;
        setActives(respuesta.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container sx={{ paddingLeft: 6, marginTop: -8 }}>
    <Grid>
      <TextField label="Tipo" value={type} onChange={handleRolChange} />
    </Grid>
    <Grid sx={{ paddingLeft: 2, marginTop: 2.5}}>
        <Button onClick={handleFilterClick} size="small" variant="contained" endIcon={<SendIcon />}>
            Filtrar Activo
        </Button>
    </Grid>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Activo</TableCell>
          <TableCell>Tipo</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {actives.map((actives) => (
          <TableRow key={actives.assets_id}>
            <TableCell>{actives.name}</TableCell>
            <TableCell>{actives.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Grid>
  );
}

export default ActiveFilter;