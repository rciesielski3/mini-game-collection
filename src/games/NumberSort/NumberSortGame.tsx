import React from "react";
import "./NumberSortGame.css";

import { getNicknameOrPrompt } from "../../helpers/getNicknameOrPrompt";
import { saveScoreIfHighest } from "../../utils/firestore";

const generateNumbers = () =>
  Array.from({ length: 6 }, () => Math.floor(Math.random() * 90 + 10));

const NumberSortGame = () => {
  const [numbers, setNumbers] = React.useState<number[]>([]);
  const [targetIndex, setTargetIndex] = React.useState(0);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
  const [startTime, setStartTime] = React.useState<number | null>(null);
  const [feedback, setFeedback] = React.useState<{
    [key: number]: "correct" | "wrong";
  }>({});
  const [elapsed, setElapsed] = React.useState<number | null>(null);

  const sorted = React.useMemo(
    () => [...numbers].sort((a, b) => a - b),
    [numbers]
  );
  const shuffle = (arr: number[]) => [...arr].sort(() => Math.random() - 0.5);

  const startGame = () => {
    const nums = generateNumbers();
    setNumbers(shuffle(nums));
    setTargetIndex(0);
    setGameOver(false);
    setGameStarted(true);
    setElapsed(null);
    setFeedback({});
    setStartTime(Date.now());
  };

  const handleClick = async (value: number) => {
    if (gameOver) return;

    if (value === sorted[targetIndex]) {
      setFeedback((f) => ({ ...f, [value]: "correct" }));
      if (targetIndex === sorted.length - 1) {
        const timeTaken = Date.now() - (startTime ?? Date.now());
        setElapsed(timeTaken);
        setGameOver(true);
        const nickname = await getNicknameOrPrompt();
        if (nickname) {
          await saveScoreIfHighest(
            "NumberSortGame",
            100000 - timeTaken,
            nickname
          );
        }
      } else {
        setTargetIndex((i) => i + 1);
      }
    } else {
      setFeedback((f) => ({ ...f, [value]: "wrong" }));
      setTimeout(() => {
        setFeedback((f) => {
          const copy = { ...f };
          delete copy[value];
          return copy;
        });
      }, 500);
    }
  };

  return (
    <div className="game-container">
      <h2 className="game-title">🔢 Number Sort</h2>

      {!gameStarted ? (
        <>
          <p className="instruction">
            Click the numbers from smallest to largest as fast as you can!
          </p>
          <button className="game-button" onClick={startGame}>
            Start Game
          </button>
        </>
      ) : (
        <>
          <div className="number-grid">
            {numbers.map((num, i) => (
              <button
                key={i}
                className={`number-tile ${feedback[num] || ""}`}
                onClick={() => handleClick(num)}
                disabled={
                  gameOver || sorted.slice(0, targetIndex).includes(num)
                }
              >
                {num}
              </button>
            ))}
            <p className="instruction">Sort numbers in the correct order.</p>
          </div>
          {gameOver && elapsed !== null && (
            <p className="score-display">
              ✅ Time: {(elapsed / 1000).toFixed(2)}s
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default NumberSortGame;
