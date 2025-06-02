import React from "react";
import "./PatternMemoryGame.css";

import { saveScoreIfHighest } from "../../utils/firestore";
import { getNicknameOrPrompt } from "../../helpers/getNicknameOrPrompt";

const colors = ["red", "green", "blue", "yellow"] as const;
type Color = (typeof colors)[number];

const getRandomColor = (): Color =>
  colors[Math.floor(Math.random() * colors.length)];

const PatternMemoryGame = () => {
  const [pattern, setPattern] = React.useState<Color[]>([]);
  const [userIndex, setUserIndex] = React.useState(0);
  const [isUserTurn, setIsUserTurn] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [highlight, setHighlight] = React.useState<Color | null>(null);
  const [gameOver, setGameOver] = React.useState(false);

  const playPattern = async (newPattern: Color[]) => {
    setIsUserTurn(false);
    for (let i = 0; i < newPattern.length; i++) {
      setHighlight(newPattern[i]);
      await new Promise((r) => setTimeout(r, 500));
      setHighlight(null);
      await new Promise((r) => setTimeout(r, 200));
    }
    setIsUserTurn(true);
  };

  const startGame = async () => {
    const firstColor = getRandomColor();
    const newPattern = [firstColor];
    setPattern(newPattern);
    setScore(0);
    setGameOver(false);
    setUserIndex(0);
    await playPattern(newPattern);
  };

  const handleClick = async (color: Color) => {
    if (!isUserTurn || gameOver) return;

    if (color === pattern[userIndex]) {
      const nextIndex = userIndex + 1;
      if (nextIndex === pattern.length) {
        const nextColor = getRandomColor();
        const newPattern = [...pattern, nextColor];
        setPattern(newPattern);
        setScore(newPattern.length - 1);
        setUserIndex(0);
        await playPattern(newPattern);
      } else {
        setUserIndex(nextIndex);
      }
    } else {
      setGameOver(true);
      const nickname = await getNicknameOrPrompt();
      if (nickname) {
        await saveScoreIfHighest("PatternMemoryGame", score, nickname);
      }
    }
  };

  return (
    <div className="game-container">
      <h2 className="game-title">💠 Pattern Memory</h2>
      <div className="score-display">Score: {score}</div>

      <div className="color-grid-pattern">
        {colors.map((color) => (
          <button
            key={color}
            className={`color-button ${color} ${
              highlight === color ? "active" : ""
            }`}
            onClick={() => handleClick(color)}
            disabled={!isUserTurn}
          />
        ))}
      </div>

      {!isUserTurn && !gameOver && pattern.length > 0 && (
        <p className="instruction">Watch the pattern...</p>
      )}
      {isUserTurn && !gameOver && (
        <p className="instruction">Your turn! Repeat the pattern.</p>
      )}
      {gameOver && (
        <>
          <p className="instruction">Game Over! Final Score: {score}</p>
          <button className="restart-button" onClick={startGame}>
            Play Again
          </button>
        </>
      )}

      {pattern.length === 0 && !gameOver && (
        <button className="game-button" onClick={startGame}>
          Start Game
        </button>
      )}
      <p className="instruction">Repeat the light pattern as it grows!</p>
    </div>
  );
};

export default PatternMemoryGame;
