import React from 'react';
import Header from './components/Header';
import Empleados from './components/Empleados';
import NuevoEmpleado from './components/NuevoEmpleado';
import EditarEmpleado from './components/EditarEmpleado';

import  { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//Redux 
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Router >
      <Provider store={store}>
        <Header />
        <div>
          <Routes>
            <Route exact path='/' element={<Empleados/>}/>
            <Route exact path='/employees/new' element={<NuevoEmpleado/>}/>
            <Route exact path='/employees/edit/:id' element={<EditarEmpleado/>}/>
          </Routes>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
