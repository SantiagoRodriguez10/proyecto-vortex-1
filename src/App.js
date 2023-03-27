import React from 'react';
import Header from './components/Header';
/* import Empleados from './components/Empleados'; */
import Main from './components/ToggleButton';
import NuevoEmpleado from './components/NuevoEmpleado';
import NuevoActivo from './components/Activos/NuevoActivo';
import EditarEmpleado from './components/EditarEmpleado';
import DetalleEmpleado from './components/DetalleEmpleado';
import { useRouteError } from 'react-router-dom';
import { Stack } from '@mui/material';
import {Alert} from '@mui/material';

import  { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//Redux 
import { Provider } from 'react-redux';
import store from './store';

function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return <div>{error.message}</div>;
}

function App() {
  return (
    <Router >
      
      <Provider store={store}>
        <Header />
        <div>
          <Routes>
            <Route exact path='/' element={<Main/>}  />
            <Route exact path='/employees/new' element={<NuevoEmpleado/>}/>
            <Route exact path='/assets/new' element={<NuevoActivo/>}/>
            <Route exact path='/employees/edit/:employee_id' element={<EditarEmpleado/>}/>
            <Route exact path='/employees/detail/:employee_id' element={<DetalleEmpleado/>}/>
            <Route 
              path="*" 
              element={
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert severity="error">
                    Error! — <strong> Esta página no existe</strong>
                  </Alert>
                  </Stack>
                </div>} 
              />
          </Routes>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
