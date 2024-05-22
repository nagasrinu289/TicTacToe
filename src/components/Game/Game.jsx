import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Game.css';

const Game = () => {
  const location = useLocation();
  const { player1, player2 } = location.state || { player1: '', player2: '' };

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  
  const handleClick = (index) => {
    const newBoard = board.slice();
    if (newBoard[index] || calculateWinner(newBoard)) {
      return;
    }
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
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
    return null;
  };

  const winner = calculateWinner(board);
  let status = "";
  if (winner === null) {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  } else if (winner === "Draw") {
    status = 'Match Draw';
  } else {
    status = `Winner: ${winner}`;
  }

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  const refresh = () => {
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="game-container">
      <h2>Tic Tac Toe</h2>
      <Link to={'/'} className='link'>Exit</Link>
      <p className="player"><span role="img" aria-label="Player 1">👤</span> {`Player 1: ${player1} (X)`}</p>
      <p className="player"><span role="img" aria-label="Player 2">👤</span> {`Player 2: ${player2} (O)`}</p>
      <div className="status">{status}</div>
      <div className="board">
        {board.map((square, index) => renderSquare(index))}
      </div>
      <button type='button' onClick={refresh}>Restart</button>
    </div>
  );
};

export default Game;
