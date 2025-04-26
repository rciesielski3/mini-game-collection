import React from "react";
import "./DinoGame.css";

import { saveScoreIfHighest } from "../../utils/firestore";

const GAME_HEIGHT = 250;
const GRAVITY = 0.3;
const JUMP_VELOCITY = 10;
const GROUND_Y = 0;

const DinoGame = () => {
  const [y, setY] = React.useState(GROUND_Y);
  const [velocity, setVelocity] = React.useState(0);
  const [isJumping, setIsJumping] = React.useState(false);
  const [obstacles, setObstacles] = React.useState<
    { x: number; color: string; passed?: boolean }[]
  >([]);
  const [gameOver, setGameOver] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [difficulty, setDifficulty] = React.useState(2000);
  const animationRef = React.useRef<number | null>(null);
  const lastObstacleTime = React.useRef<number>(0);

  React.useEffect(() => {
    if (gameOver) return;

    const update = () => {
      setY((prevY) => {
        const nextY = prevY + velocity;

        if (nextY <= GROUND_Y) {
          setIsJumping(false);
          setVelocity(0);
          return GROUND_Y;
        }

        return nextY;
      });

      setVelocity((prevV) => prevV - GRAVITY);
      animationRef.current = requestAnimationFrame(update);
    };

    animationRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationRef.current!);
  }, [velocity, gameOver]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " && !isJumping && !gameOver) {
        setIsJumping(true);
        setVelocity(JUMP_VELOCITY);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isJumping, gameOver]);

  React.useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setObstacles((prev) => {
        const updated = prev
          .map((o) => {
            const newX = o.x - 8;
            let passed = o.passed;
            if (!passed && newX < 30) {
              passed = true;
              setScore((s) => s + 1);
            }
            return { ...o, x: newX, passed };
          })
          .filter((o) => o.x > -30);

        if (score % 5 === 0 && score !== 0 && difficulty > 600) {
          setDifficulty((d) => d - 100);
        }

        return updated;
      });

      const now = Date.now();
      if (now - lastObstacleTime.current > difficulty) {
        const colors = ["#f44336", "#9c27b0", "#3f51b5", "#009688", "#ff9800"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setObstacles((prev) => [...prev, { x: 500, color: randomColor }]);
        lastObstacleTime.current = now;
      }
    }, 60);

    return () => clearInterval(interval);
  }, [gameOver, difficulty, score]);

  React.useEffect(() => {
    const hit = obstacles.some((o) => o.x < 70 && o.x > 40 && y <= 35);
    if (hit) {
      setGameOver(true);
      if (score > 0) {
        saveScoreIfHighest("DinoJump", score);
      }
    }
  }, [obstacles, y]);

  const restart = () => {
    setY(GROUND_Y);
    setVelocity(0);
    setIsJumping(false);
    setObstacles([]);
    setGameOver(false);
    setScore(0);
    setDifficulty(2000);
  };

  return (
    <div className="game-container">
      <h2 className="game-title">🦖 Dino Jump</h2>
      <div className="score-display">Score: {score}</div>
      <div className="game-background" style={{ height: GAME_HEIGHT }}>
        <div className="dino" style={{ bottom: `${y}px` }}></div>

        {obstacles.map((ob, i) => (
          <div
            key={i}
            className="obstacle"
            style={{ left: `${ob.x}px`, backgroundColor: ob.color }}
          ></div>
        ))}
      </div>

      {gameOver ? (
        <div className="game-over">
          <p>Game Over!</p>
          <button className="restart-button" onClick={restart}>
            Restart
          </button>
        </div>
      ) : (
        <p className="instruction">
          Press <kbd>Space</kbd> to jump over obstacles
        </p>
      )}
    </div>
  );
};

export default DinoGame;
