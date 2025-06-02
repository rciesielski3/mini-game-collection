import React from "react";
import "./NumberChaseGame.css";

import { getNicknameOrPrompt } from "../../helpers/getNicknameOrPrompt";
import { saveScore } from "../../utils/firestore";

const generateNumbers = () => {
  return [...Array(25)].map((_, i) => i + 1).sort(() => Math.random() - 0.5);
};

const NumberChaseGame = () => {
  const [numbers, setNumbers] = React.useState<number[]>([]);
  const [nextNumber, setNextNumber] = React.useState(1);
  const [startTime, setStartTime] = React.useState<number | null>(null);
  const [elapsed, setElapsed] = React.useState<number>(0);
  const [gameOver, setGameOver] = React.useState(false);

  const startGame = () => {
    setNumbers(generateNumbers());
    setNextNumber(1);
    setElapsed(0);
    setGameOver(false);
    setStartTime(Date.now());
  };

  const handleClick = async (num: number) => {
    if (num !== nextNumber) return;

    if (nextNumber === 25) {
      const end = Date.now();
      const time = end - (startTime ?? end);
      setElapsed(time);
      setGameOver(true);

      const nickname = await getNicknameOrPrompt();
      if (nickname) {
        const seconds = parseFloat((time / 1000).toFixed(3));
        await saveScore("NumberChaseGame", seconds, nickname);
      }
    } else {
      setNextNumber(nextNumber + 1);
    }
  };

  return (
    <div className="game-container">
      <h2 className="game-title">🪿 Number Chase</h2>
      {!startTime ? (
        <>
          <p className="instruction">
            Click the numbers in order from 1 to 25 as fast as possible!
          </p>
          <button className="game-button" onClick={startGame}>
            Start Game
          </button>
        </>
      ) : (
        <>
          <div className="score-display">
            {gameOver
              ? `✅ Time: ${(elapsed / 1000).toFixed(3)}s`
              : `Next: ${nextNumber}`}
          </div>
          <div className="grid-5x5">
            {numbers.map((num) => (
              <button
                key={num}
                className={`grid-tile ${num < nextNumber ? "disabled" : ""}`}
                onClick={() => handleClick(num)}
                disabled={num < nextNumber || gameOver}
              >
                {num}
              </button>
            ))}
          </div>
        </>
      )}
      <p className="instruction">Click 1–25 in order. Accuracy matters!</p>
    </div>
  );
};

export default NumberChaseGame;
