import React from "react";

import "./SquaresGame.css";

const getRandomColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

export const SquaresGame = () => {
  const [targetColor, setTargetColor] = React.useState("");
  const [colors, setColors] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    const newColors = Array.from({ length: 6 }, getRandomColor);
    setColors(newColors);
    const picked = newColors[Math.floor(Math.random() * newColors.length)];
    setTargetColor(picked);
  }, []);

  const handleClick = (color: string) => {
    if (color === targetColor) {
      setMessage("Correct!");
    } else {
      setMessage("Try again.");
    }
  };

  return (
    <div className="squares-container">
      <h2>Guess the Color: {targetColor}</h2>
      <div className="squares-grid">
        {colors.map((color, i) => (
          <div
            key={i}
            className="square"
            style={{ backgroundColor: color }}
            onClick={() => handleClick(color)}
          />
        ))}
      </div>
      <p>{message}</p>
    </div>
  );
};
