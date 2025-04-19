import React from "react";

import "./WhackAMole.css";

const MOLE_COUNT = 9;
const GAME_TIME = 15000;

const WhackAMole = () => {
  const [activeMole, setActiveMole] = React.useState<number | null>(null);
  const [score, setScore] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(GAME_TIME / 1000);
  const [gameRunning, setGameRunning] = React.useState(false);
  const intervalRef = React.useRef<number | null>(null);
  const timerRef = React.useRef<number | null>(null);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_TIME / 1000);
    setGameRunning(true);

    intervalRef.current = window.setInterval(() => {
      const next = Math.floor(Math.random() * MOLE_COUNT);
      setActiveMole(next);
    }, 700);

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopGame = () => {
    clearInterval(intervalRef.current!);
    clearInterval(timerRef.current!);
    setGameRunning(false);
    setActiveMole(null);
  };

  const handleWhack = (index: number) => {
    if (index === activeMole) {
      setScore((prev) => prev + 1);
      setActiveMole(null);
    }
  };

  return (
    <div className="wam-container">
      <h2>Whack-a-Mole</h2>
      <div className="wam-info">
        <p>Score: {score}</p>
        <p>Time: {timeLeft}s</p>
      </div>
      <div className="wam-grid">
        {Array.from({ length: MOLE_COUNT }).map((_, i) => (
          <div
            key={i}
            className={`wam-hole ${activeMole === i ? "active" : ""}`}
            onClick={() => handleWhack(i)}
          />
        ))}
      </div>
      {!gameRunning && (
        <button className="wam-start" onClick={startGame}>
          Start Game
        </button>
      )}
    </div>
  );
};

export default WhackAMole;
