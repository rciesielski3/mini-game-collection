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

const SquaresGame: React.FC = () => {
  const [colors, setColors] = React.useState<string[]>([]);
  const [targetColor, setTargetColor] = React.useState<string>("");
  const [score, setScore] = React.useState(0);
  const [feedback, setFeedback] = React.useState<string>("");

  const generateColors = () => {
    const newColors = Array.from({ length: 6 }, () => generateRandomColor());
    const pickedColor = newColors[Math.floor(Math.random() * newColors.length)];
    setColors(newColors);
    setTargetColor(pickedColor);
  };

  React.useEffect(() => {
    generateColors();
  }, []);

  const handleClick = (color: string) => {
    if (color === targetColor) {
      setScore((prev) => prev + 1);
      setFeedback("✅ Correct!");
      generateColors();
    } else {
      setFeedback("❌ Try again");
    }
  };

  const resetGame = () => {
    setScore(0);
    setFeedback("");
    generateColors();
  };

  return (
    <div className="game-container">
      <h2 className="game-title">🎨 Color Match</h2>
      <div className="score-display">Score: {score}</div>

      <div className="target-color">
        Target: <span>{targetColor}</span>
      </div>

      <div className="color-grid">
        {colors.map((color, idx) => (
          <div
            key={idx}
            className="color-square"
            style={{ backgroundColor: color }}
            onClick={() => handleClick(color)}
          ></div>
        ))}
      </div>
      <p className="instruction">
        Click the square that matches the target color below.
      </p>
      {feedback && <p className="instruction">{feedback}</p>}

      <button className="restart-button" onClick={resetGame}>
        Restart
      </button>
    </div>
  );
};

export default SquaresGame;
