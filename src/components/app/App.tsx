import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductListPage from '../../pages/ProductListPage/ProductListPage';
import ProductPage from '../../pages/ProductPage/ProductPage';
import Header from '../Header/Header';
import './App.sass';

const App: React.FC  = () =>  {
  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route  path='/' element = {<ProductListPage/>}></Route>
            <Route  path='/product/:id' element = {<ProductPage/>}></Route>
        </Routes>

    </div>
  );
}

export default App;
