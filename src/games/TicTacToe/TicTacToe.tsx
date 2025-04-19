import React from "react";

import "./TicTacToe.css";

const emptyBoard = Array(9).fill(null);

const TicTacToe = () => {
  const [board, setBoard] = React.useState<(string | null)[]>(emptyBoard);
  const [xIsNext, setXIsNext] = React.useState(true);

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(Boolean);

  const handleClick = (index: number) => {
    if (board[index] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const restartGame = () => {
    setBoard(emptyBoard);
    setXIsNext(true);
  };

  return (
    <div className="ttt-container">
      <h2>Tic-Tac-Toe</h2>
      <div className="ttt-board">
        {board.map((cell, i) => (
          <div
            key={i}
            className={`ttt-cell ${
              cell === "X" ? "cell-x" : cell === "O" ? "cell-o" : ""
            }`}
            onClick={() => handleClick(i)}
          >
            {cell}
          </div>
        ))}
      </div>
      <p className="ttt-status">
        {winner
          ? `Winner: ${winner}`
          : isDraw
          ? "It's a draw!"
          : `Next player: ${xIsNext ? "X" : "O"}`}
      </p>
      <button className="ttt-restart" onClick={restartGame}>
        Restart
      </button>
    </div>
  );
};

function calculateWinner(board: (string | null)[]) {
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
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default TicTacToe;
