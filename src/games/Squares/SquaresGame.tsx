import React from "react";
import "./SquaresGame.css";

const generateRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

type Props = {
  onScore?: (score: number) => void;
};

const GAME_DURATION = 30;

const SquaresGame = ({ onScore }: Props) => {
  const [colors, setColors] = React.useState<string[]>([]);
  const [targetColor, setTargetColor] = React.useState<string>("");
  const [score, setScore] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(GAME_DURATION);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");

  const timerRef = React.useRef<number | null>(null);

  // Initial color grid is visible but no targetColor
  React.useEffect(() => {
    const newColors = Array.from({ length: 6 }, () => generateRandomColor());
    setColors(newColors);
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameStarted(true);
    setGameOver(false);
    setFeedback("");

    // Pick a target color from the existing board
    const picked = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(picked);

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setGameOver(true);
          setGameStarted(false);
          if (onScore) onScore(score);
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

      // Pick new target color and refresh the board
      const newColors = Array.from({ length: 6 }, () => generateRandomColor());
      const newTarget = newColors[Math.floor(Math.random() * newColors.length)];
      setColors(newColors);
      setTargetColor(newTarget);
    } else {
      setFeedback("❌ Try again");
    }
  };

  const resetGame = () => {
    if (score > 0 && onScore) onScore(score);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameStarted(false);
    setGameOver(false);
    setFeedback("");
    clearInterval(timerRef.current!);

    // Reset board
    const newColors = Array.from({ length: 6 }, () => generateRandomColor());
    setColors(newColors);
    setTargetColor("");
  };

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

export default SquaresGame;
