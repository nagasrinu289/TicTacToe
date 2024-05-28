import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import Home from './components/Home/Home';
import Game from './components/Game/Game';
import NotFound from './components/NotFound/NotFound';
import Dashboard from './components/Dashboard/dashboard';
import OnlineMode from './components/Home/OnlineMode';
import OnlineGame from './components/Game/online/OnlineGame';


const App = () => {
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/dashboard/ofline' element={<Home />}/>
          <Route path='/dashboard/online' element={<OnlineMode />}/>
          <Route  path='/dashboard/online/game' element={<OnlineGame />}/>
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
