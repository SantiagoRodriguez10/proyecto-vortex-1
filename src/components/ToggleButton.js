//React
import React from 'react'
//MaterialUI
import { 
  ToggleButton,
  ToggleButtonGroup,
  Grid
} from '@mui/material';

import Activos from './Activos/Activos';
import Empleados from './Empleados';

function Main() {

//Material UI ToggleButton
const [alignment, setAlignment] = React.useState('Empleados');
const [tableData, setTableData] = React.useState([]);

const handleChange = (event, newAlignment) => {
  setAlignment(newAlignment);
  setTableData([]);
};

const handleTableDataChange = (newTableData) => {
  setTableData(newTableData);
};

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
          <h2 className='text-center mb-4 font-weight-bold' style={{ color: "#515151", paddingLeft:530}}>
                Lista de {alignment === "Empleados" ? "Empleados" : "Activos"}
          </h2>
        <Grid sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 8, paddingTop: 2}}>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            sx={{ alignSelf: "center"}}
          >
            <ToggleButton sx={{fontWeight: 'bold', borderWidth: 2}} value="Empleados">Empleados</ToggleButton>
            <ToggleButton sx={{fontWeight: 'bold'}} value="Activos">Activos</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      {alignment === "Empleados" ? (
         <Empleados tableData={tableData} onTableDataChange={handleTableDataChange} />
         ) : alignment === 'Activos' ? (
           <Activos tableData={tableData} onTableDataChange={handleTableDataChange} />
         ) : null}
    </>
  )
}

export default Main