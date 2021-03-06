import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './Routes/Home';
import MyContents from './Routes/MyContents';
import Search from './Routes/Search';
import TV from './Routes/TV';

export default function Router() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/movie' element={<Home />}></Route>
        <Route path='/movie/:id' element={<Home />}></Route>
        <Route path='/tv' element={<TV></TV>}></Route>
        <Route path='/tv/:id' element={<TV></TV>}></Route>
        <Route path='/search/*' element={<Search></Search>}></Route>
        <Route path='/search/:type' element={<Search></Search>}></Route>
        <Route
          path='/my_contents/*'
          element={<MyContents></MyContents>}
        ></Route>
      </Routes>
    </>
  );
}
