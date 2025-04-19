import React, { useState, useEffect, useCallback } from "react";
import "./SquaresGame.css";

const NUM_SQUARES = 6;

const getRandomHexColor = (): string => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, "0")}`; // Ensure 6-digit color
};

const SquaresGame: React.FC = () => {
  const [targetColor, setTargetColor] = useState<string>("");
  const [colors, setColors] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const initializeGame = useCallback(() => {
    const newColors = Array.from({ length: NUM_SQUARES }, getRandomHexColor);
    setColors(newColors);
    const randomIndex = Math.floor(Math.random() * newColors.length);
    setTargetColor(newColors[randomIndex]);
    setMessage("");
    setIsCorrect(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleSquareClick = (color: string): void => {
    const correct = color === targetColor;
    setIsCorrect(correct);
    setMessage(correct ? "Correct! 🎉" : "Try again!");

    if (correct) {
      setTimeout(initializeGame, 1500); // Reset after correct guess
    }
  };

  return (
    <div className="game-container">
      <h2 className="game-title">
        Guess the Color: <span className="color-value">{targetColor}</span>
      </h2>

      <div className="squares-grid">
        {colors.map((color, index) => (
          <button
            key={`${color}-${index}`}
            className="color-square"
            style={{ backgroundColor: color }}
            onClick={() => handleSquareClick(color)}
            aria-label={`Color square ${index + 1}`}
          />
        ))}
      </div>

      <p className={`message ${isCorrect ? "text-success" : "text-error"}`}>
        {message}
      </p>

      <button className="reset-button" onClick={initializeGame}>
        New Colors
      </button>
    </div>
  );
};

export default SquaresGame;
