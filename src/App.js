import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './routes/login';
import Mainpage from './routes/Mainpage.js';
import NotFound from './routes/NotFound.js';
import Layout from './Layout.js';
import About from './routes/About.js';
import GAuthRoute from './routes/GAuthRoute.js';
import Upload from './routes/Upload.js';
import Banned from './routes/Banned.js';

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
