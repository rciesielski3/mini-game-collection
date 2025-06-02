import React from "react";
import "./ColorMatchGame.css";

import { saveScore } from "../../utils/firestore";
import { getNicknameOrPrompt } from "../../helpers/getNicknameOrPrompt";

const generateRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const GAME_DURATION = 30;

const ColorMatchGame = () => {
  const [colors, setColors] = React.useState<string[]>([]);
  const [targetColor, setTargetColor] = React.useState<string>("");
  const [score, setScore] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(GAME_DURATION);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");
  const timerRef = React.useRef<number | null>(null);

  const handleGameOver = async () => {
    const nickname = await getNicknameOrPrompt();
    if (nickname && score > 0) {
      await saveScore("SquaresGame", score, nickname);
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameStarted(true);
    setGameOver(false);
    setFeedback("");

    const picked = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(picked);

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setGameOver(true);
          setGameStarted(false);
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleClick = (color: string) => {
    if (!gameStarted || gameOver) return;
    if (color === targetColor) {
      setScore((prev) => prev + 1);
      setFeedback("✅ Correct!");

      const newColors = Array.from({ length: 6 }, () => generateRandomColor());
      const newTarget = newColors[Math.floor(Math.random() * newColors.length)];
      setColors(newColors);
      setTargetColor(newTarget);
    } else {
      setFeedback("❌ Try again");
    }
  };

  const resetGame = () => {
    handleGameOver();
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameStarted(false);
    setGameOver(false);
    setFeedback("");
    clearInterval(timerRef.current!);

    const newColors = Array.from({ length: 6 }, () => generateRandomColor());
    setColors(newColors);
    setTargetColor("");
  };

  React.useEffect(() => {
    const newColors = Array.from({ length: 6 }, () => generateRandomColor());
    setColors(newColors);
  }, []);

  return (
    <div className="game-container">
      <h2 className="game-title">🎨 Color Match</h2>
      <div className="score-display">Score: {score}</div>
      {gameOver && (
        <>
          <p className="instruction">
            ⏱️ Time's up! You scored {score} points.
          </p>
          <button className="restart-button" onClick={resetGame}>
            Play Again
          </button>
        </>
      )}
      {gameStarted && !gameOver && targetColor && (
        <div className="target-color">
          Target: <span>{targetColor}</span>
        </div>
      )}
      <div className="color-grid">
        {colors.map((color, idx) => (
          <div
            key={idx}
            className="color-square"
            style={{ backgroundColor: color }}
            onClick={() => handleClick(color)}
          />
        ))}
      </div>
      <div className="score-display">Time Left: {timeLeft}s</div>
      <p className="instruction">
        {gameStarted && !gameOver
          ? "Click the square that matches the target color!"
          : "Click start to begin the game"}
      </p>
      {feedback && <p className="instruction">{feedback}</p>}
      {!gameStarted && !gameOver && (
        <button className="game-button" onClick={startGame}>
          Start Game
        </button>
      )}
    </div>
  );
};

export default ColorMatchGame;
