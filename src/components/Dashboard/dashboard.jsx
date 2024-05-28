import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import './dashboard.css';
const Dashboard = () => {
  const [socket, setSocket] = useState(null);
  const nav = useNavigate();

  const goToOnline = () =>{
    nav('/dashboard/online')
  }
  const goToOfline = () => {

    nav('/dashboard/ofline')
  }
  
  return (
    <div className='dashboardcontainer'>
      <button className='Box' onClick={goToOnline}>Online Mode</button>
      <button className='Box' onClick={goToOfline}>Ofline Mode</button>
    </div>
  )
}

export default Dashboard;
