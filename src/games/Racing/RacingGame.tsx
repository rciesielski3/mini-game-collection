import React from "react";

import "./RacingGame.css";

const LANE_COUNT = 8;
const GAME_HEIGHT = 300;
const OBSTACLE_INTERVAL = 1500;
const CAR_WIDTH = 40;
const OBSTACLE_HEIGHT = 20;

const RacingGame = () => {
  const [lane, setLane] = React.useState(1);
  const [obstacles, setObstacles] = React.useState<
    { lane: number; y: number }[]
  >([]);
  const [gameOver, setGameOver] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const gameRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!running || gameOver) return;
      if (e.key === "ArrowLeft" && lane > 0) setLane((prev) => prev - 1);
      if (e.key === "ArrowRight" && lane < LANE_COUNT - 1)
        setLane((prev) => prev + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lane, gameOver, running]);

  React.useEffect(() => {
    if (!running || gameOver) return;
    const interval = setInterval(() => {
      setObstacles((prev) => {
        let newScore = 0;
        const updated = prev
          .map((ob) => {
            const newY = ob.y + 10;
            if (newY >= GAME_HEIGHT) newScore += 1;
            return { ...ob, y: newY };
          })
          .filter((ob) => ob.y < GAME_HEIGHT);

        if (newScore > 0) setScore((s) => s + newScore);
        return updated;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [gameOver, running]);

  React.useEffect(() => {
    if (!running || gameOver) return;
    const interval = setInterval(() => {
      const randomLane = Math.floor(Math.random() * LANE_COUNT);
      setObstacles((prev) => [...prev, { lane: randomLane, y: 0 }]);
    }, OBSTACLE_INTERVAL);
    return () => clearInterval(interval);
  }, [gameOver, running]);

  React.useEffect(() => {
    if (!running) return;
    const collision = obstacles.some(
      (ob) => ob.lane === lane && ob.y >= GAME_HEIGHT - OBSTACLE_HEIGHT * 2
    );
    if (collision) {
      setGameOver(true);
      setRunning(false);
    }
  }, [obstacles, lane, running]);

  const startGame = () => {
    setLane(1);
    setObstacles([]);
    setGameOver(false);
    setScore(0);
    setRunning(true);
  };

  return (
    <div className="racing-container">
      <h2>Racing Game</h2>
      <div className="racing-score">Score: {score}</div>
      <div
        ref={gameRef}
        className="racing-game"
        style={{
          width: `${LANE_COUNT * CAR_WIDTH}px`,
          height: `${GAME_HEIGHT}px`,
        }}
      >
        <div
          className="racing-car"
          style={{ left: `${lane * CAR_WIDTH}px`, width: `${CAR_WIDTH}px` }}
        />

        {obstacles.map((ob, i) => (
          <div
            key={i}
            className="racing-obstacle"
            style={{
              top: `${ob.y}px`,
              left: `${ob.lane * CAR_WIDTH}px`,
              width: `${CAR_WIDTH}px`,
              height: `${OBSTACLE_HEIGHT}px`,
            }}
          />
        ))}
      </div>

      {gameOver ? (
        <div className="racing-over">
          <p>Game Over!</p>
          <button onClick={startGame}>Restart</button>
        </div>
      ) : !running ? (
        <button className="wam-start" onClick={startGame}>
          Start Game
        </button>
      ) : (
        <p className="racing-controls">Use ⬅️ and ➡️ to move the car</p>
      )}
    </div>
  );
};

export default RacingGame;
