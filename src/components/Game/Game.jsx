import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './online/onlinegame.css'

const Game = () => {
  const location = useLocation();
  const { player1, player2 } = location.state || { player1: '', player2: '' };

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    setXIsNext ? document.getElementById('left').style.backgroundColor='red' : document.getElementById("right").style.backgroundColor='red'
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    const Draw = squares.flat().every(e=>{
      if(e==="X" || e==="O"){
        return true
      }
    })
    if(Draw){
      return "draw"
    }
    return null;
  };

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setWinner(winner);
    }
  }, [board]);

  const status = winner!=="draw"
    ? `Winner is ${winner==='X'?`${player1}`:`${player2}`}`
    : "It's a draw";

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  const refresh = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };
  
  useEffect(() => {
    if (xIsNext) {
      document.getElementById('left').style.backgroundColor = 'red';
      document.getElementById('right').style.backgroundColor = 'transparent';
    } else {
      document.getElementById('left').style.backgroundColor = 'transparent';
      document.getElementById('right').style.backgroundColor = 'red'; 
    }
  }, [xIsNext]);


  return (
    <div className="game-container">
      <h2>Tic Tac Toe</h2>
      <Link to={'/'} className='link'>Exit</Link>
      <div className='move-detection'>
      <div className='left' id='left'>{player1}</div>
      <div className='right' id='right'>{player2}</div>
      </div>
      {winner && <div className='g-status'>{status}</div>}
      <div className="board">
        {board.map((square, index) => renderSquare(index))}
      </div>
      <button className='btn-restart' type='button' onClick={refresh}>Restart</button>
    </div>
  );
};

export default Game;