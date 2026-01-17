import  { useState } from 'react';
import Square from './Square';
import '../Style/Board.css';

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return;
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const result = calculateWinner(squares);
  const winner = result?.winner;
  const winningSquares = result?.line;
  const isBoardFull = squares.every(square => square !== null);
  const isDraw = !winner && isBoardFull;

  let status, statusClass, statusIcon;
  
  if (winner) {
    status = `Winner: ${winner}`;
    statusClass = winner === 'X' ? 'status-x' : 'status-o';
    statusIcon = '🎉';
  } else if (isDraw) {
    status = "It's a Draw!";
    statusClass = 'status-draw';
    statusIcon = '🤝';
  } else {
    status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
    statusClass = xIsNext ? 'status-x' : 'status-o';
    statusIcon = '🎮';
  }

  return (
    <div className="game-container">
      <h1 className="title">Tic Tac Toe</h1>
      
      <div className="status-container">
        <span className="status-icon">{statusIcon}</span>
        <span className={`status-text ${statusClass}`}>{status}</span>
      </div>

      <div className="board">
        {squares.map((square, i) => (
          <Square
            key={i}
            value={square}
            onSquareClick={() => handleClick(i)}
            isWinning={winningSquares?.includes(i)}
          />
        ))}
      </div>

      <button onClick={resetGame} className="reset-button">
        🔄 Reset Game
      </button>

      <div className="player-legend">
        <div className="legend-item">
          <span className="legend-symbol x-player">X</span>
          <span className="legend-label">Player 1</span>
        </div>
        <div className="legend-item">
          <span className="legend-symbol o-player">O</span>
          <span className="legend-label">Player 2</span>
        </div>
      </div>
    </div>
  );
};

export default Board;