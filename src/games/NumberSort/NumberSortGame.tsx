import React from "react";
import "./NumberSortGame.css";

import { getNicknameOrPrompt } from "../../helpers/getNicknameOrPrompt";
import { saveScore } from "../../utils/firestore";

const generateNumbers = () => {
  const uniqueSet = new Set<number>();
  while (uniqueSet.size < 6) {
    uniqueSet.add(Math.floor(Math.random() * 90 + 10));
  }
  return Array.from(uniqueSet);
};

const NumberSortGame = () => {
  const [numbers, setNumbers] = React.useState<number[]>([]);
  const [targetIndex, setTargetIndex] = React.useState(0);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
  const [startTime, setStartTime] = React.useState<number | null>(null);
  const [elapsed, setElapsed] = React.useState<number>(0);
  const [feedback, setFeedback] = React.useState<{
    [key: number]: "correct" | "wrong";
  }>({});

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
    setElapsed(0);
    setFeedback({});
    setTimeout(() => {
      setStartTime(Date.now());
    }, 50);
  };

  const handleClick = async (value: number) => {
    if (gameOver) return;

    if (value === sorted[targetIndex]) {
      setFeedback((f) => ({ ...f, [value]: "correct" }));

      if (targetIndex === sorted.length - 1) {
        const finalTime = Date.now() - (startTime ?? Date.now());
        setElapsed(finalTime);
        setGameOver(true);

        const nickname = await getNicknameOrPrompt();
        if (nickname) {
          const timeInSeconds = parseFloat((finalTime / 1000).toFixed(3));
          await saveScore("NumberSortGame", timeInSeconds, nickname);
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

  React.useEffect(() => {
    if (!gameStarted || !startTime || gameOver) return;

    const interval = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 100);

    return () => clearInterval(interval);
  }, [gameStarted, startTime, gameOver]);

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
          <p className="score-display">⏱ Time: {Math.floor(elapsed / 1000)}s</p>

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

          {gameOver && (
            <p className="score-display">
              ✅ Final Time: {(elapsed / 1000).toFixed(3)}s
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default NumberSortGame;
