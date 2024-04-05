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
import Report from './routes/Report';
import Introduce from './routes/Introduce';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { useMediaQuery } from 'react-responsive';

function App() {
  // same as Mainpage.jsx
  const isMobile = useMediaQuery({query : "(max-width:520px)"}); // 한줄로 뜨는 최대 너비

  const isPullable = isMobile || (localStorage.getItem('isPWA') === 'true');

  const [refresh, setRefresh] = useState(0);

  const [headerVisibility, setHeaderVisibility] = useState(true);

  function triggerRefresh() {
    setRefresh(refresh + 1);
  }

  const mainpage = (
    <PullToRefresh onRefresh={async () => triggerRefresh()} pullingContent='' resistance={5}
      isPullable={isPullable && headerVisibility}>
      <Mainpage refresh={refresh} setHeaderVisibility={setHeaderVisibility}/>
    </PullToRefresh>
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/banned' element={<Banned/>} />

        <Route path='/redirect/gauth' element={<GAuthRoute/>} />

        <Route element={<Layout onRefresh={triggerRefresh} isVisible={headerVisibility}/>}>
          <Route path='/' element={mainpage} />
          <Route path='/about' element={<About/>} />
          <Route path='/upload' element={<Upload/>} />
          <Route path='/report' element={<Report/>} />
        </Route>

        <Route path='/introduce' element={<Introduce/>} />

        <Route path='/*' element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
