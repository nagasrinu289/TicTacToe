import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const navigate = useNavigate();

  const clicked = (e) => {
    e.preventDefault();
    const player1Name = document.getElementById("player1").value;
    const player2Name = document.getElementById("player2").value;
    setPlayer1(player1Name);
    setPlayer2(player2Name);
    if (player1Name.trim() === "" || player2Name.trim() === "") {
      alert("Enter the player names!");
    } else {
      navigate('/game', { state: { player1: player1Name, player2: player2Name } });
    }
  };

  return (
    <div className='HomeContainer'>
      <h1>Tic Tac Toe </h1>
      <label htmlFor="player1">Player 1 : </label>
      <input type="text" name='player1' id='player1' placeholder='Enter name' />
      <label htmlFor="player2">Player 2 : </label>
      <input type="text" name='player2' id='player2' placeholder='Enter name' />
      <button type='submit' onClick={clicked}>Submit</button>
    </div>
  );
};

export default Home;
