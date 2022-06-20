import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './Routes/Home';
import Search from './Routes/Search';
import TV from './Routes/TV';

export default function Router() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/movies' element={<Home />}></Route>
        <Route path='/movies/:id' element={<Home />}></Route>
        <Route path='/tv' element={<TV></TV>}></Route>
        <Route path='/tv/:id' element={<TV></TV>}></Route>
        <Route path='/search/*' element={<Search></Search>}></Route>
      </Routes>
    </>
  );
}
