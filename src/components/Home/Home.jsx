import React, { useState } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const p1 = document.getElementById('player1').value;
    const p2 = document.getElementById('player2').value;
    setPlayer1(p1);
    setPlayer2(p2);
    if (p1.trim() === '' || p2.trim() === '') {
      alert('Enter the player names!');
    } else {
      navigate('/game', { state: { player1: p1, player2: p2 } });
    }
  };

  return (
    <div className='HomeContainer'>
      <span role="img" aria-label="Player 1">👤</span><label htmlFor="player1">Player 1:</label>
      <input
        type="text"
        name='player1'
        id='player1'
        placeholder='Enter name'
        autoComplete='off'
      />
      <span role="img" aria-label="Player 1">👤</span><label htmlFor="player2">Player 2:</label>
      <input
        type="text"
        name='player2'
        id='player2'
        placeholder='Enter name'
        autoComplete='off'
      />
      <button type='submit' onClick={handleClick}>Submit</button>
    </div>
  );
}

export default Home;
