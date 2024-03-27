import './App.css';
import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './routes/login';
import Mainpage from './routes/Mainpage';
import NotFound from './routes/NotFound';
import Layout from './Layout';
import About from './routes/About';
import GAuthRoute from './routes/GAuthRoute';
import Upload from './routes/Upload';
import Banned from './routes/Banned';
import PullToRefresh from 'react-simple-pull-to-refresh';

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <PullToRefresh onRefresh={async () => setRefresh(refresh + 1)}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/banned' element={<Banned/>} />

          <Route path='/redirect/gauth' element={<GAuthRoute/>} />

          <Route element={<Layout/>}>
            <Route path='/' element={<Mainpage refresh={refresh}/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/upload' element={<Upload/>} />
          </Route>

          <Route path='/*' element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </PullToRefresh>
  );
}

export default App;
