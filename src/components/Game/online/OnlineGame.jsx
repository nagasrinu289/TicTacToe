import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './onlinegame.css';

const OnlineGame = ({ playerName, opponentName, playingAs, socket }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState(playingAs === 'cross');

  const handleClick = (index) => {
    if (board[index] || winner || !turn) {
      return;
    }
    const newBoard = board.slice();
    newBoard[index] = playingAs === 'cross' ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    socket.emit("playerMoveFromClient", { board: newBoard });
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
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every(square => square)) {
      return 'draw';
    }
    return null;
  };

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      if ((winner === 'X' && playingAs === 'cross') || (winner === 'O' && playingAs === 'circle')) {
        setWinner("You won the game!");
      } else if (winner === 'draw') {
        setWinner("It's a draw");
      } else {
        setWinner("Opponent won the game");
      }
    }
  }, [board, playingAs]);

  useEffect(() => {
    socket.on("playerMoveFromServer", (newBoard) => {
      setBoard(newBoard);
      setXIsNext(prev => !prev);
    });

    return () => {
      socket.off("playerMoveFromServer");
    };
  }, [socket]);

  const status = winner ? `Game Over: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const renderSquare = (index) => (
    <button className="square" key={index} onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  const refresh = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setTurn(playingAs === 'cross');
  };

  useEffect(() => {
    setTurn((xIsNext && playingAs === 'cross') || (!xIsNext && playingAs === 'circle'));
  }, [xIsNext, playingAs]);

  return (
    <div className="game-container">
      <h2>Tic Tac Toe</h2>
      {!winner && <h3>You are playing against {opponentName}</h3>}
      <Link to='/' className='link'>Exit</Link>
      <div className='move-detection'>
        <div className={`player ${turn ? 'current' : 'notcurrent'}`}>{playerName}</div>
        <div className={`player ${!turn ? 'current' : 'notcurrent'}`}>{opponentName}</div>
      </div>
      {winner && <div className='g-status'>{status}</div>}
      <div className="board">
        {board.map((square, index) => renderSquare(index))}
      </div>
      <button type='button' onClick={refresh}>Restart</button>
    </div>
  );
};

export default OnlineGame;
