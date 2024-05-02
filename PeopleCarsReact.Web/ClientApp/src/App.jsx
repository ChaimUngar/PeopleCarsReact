import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Layout from './Layout';
import AddPerson from './AddPerson';
import AddCar from './AddCar';
import DeleteCars from './DeleteCars';

import './App.css';

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/addperson' element={<AddPerson />}></Route>
                <Route path='/addcar/:id' element={<AddCar />}></Route>
                <Route path='/deletecars/:id' element={<DeleteCars />}></Route>
            </Routes>
        </Layout>
    )
};

export default App;