import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './routes/login';
import Mainpage from './routes/Mainpage';
import NotFound from './routes/NotFound';
import Layout from './Layout';
import About from './routes/About';
import GAuthRoute from './routes/GAuthRoute';
import Upload from './routes/Upload';
import Banned from './routes/Banned';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/banned' element={<Banned/>} />

        <Route path='/redirect/gauth' element={<GAuthRoute/>} />

        <Route element={<Layout/>}>
          <Route path='/' element={<Mainpage/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/upload' element={<Upload/>} />
        </Route>

        <Route path='/*' element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
