import React from "react";

import "./SnakeGame.css";

type Coord = { x: number; y: number };

const BOARD_SIZE = 10;
const INITIAL_SNAKE = [{ x: 2, y: 2 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };

const SnakeGame = () => {
  const [snake, setSnake] = React.useState(INITIAL_SNAKE);
  const [food, setFood] = React.useState(generateFood(INITIAL_SNAKE));
  const [direction, setDirection] = React.useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const gameRef = React.useRef<HTMLDivElement>(null);
  const intervalRef = React.useRef<number | null>(null);

  function generateFood(snakeBody: Coord[]): Coord {
    while (true) {
      const newX = Math.floor(Math.random() * BOARD_SIZE);
      const newY = Math.floor(Math.random() * BOARD_SIZE);
      const isOnSnake = snakeBody.some(
        (segment) => segment.x === newX && segment.y === newY
      );
      if (!isOnSnake) return { x: newX, y: newY };
    }
  }

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  React.useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setSnake((prev) => {
        const newHead = {
          x: prev[0].x + direction.x,
          y: prev[0].y + direction.y,
        };

        const hitWall =
          newHead.x < 0 ||
          newHead.y < 0 ||
          newHead.x >= BOARD_SIZE ||
          newHead.y >= BOARD_SIZE;
        const hitSelf = prev.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        );

        if (hitWall || hitSelf) {
          setIsGameOver(true);
          clearInterval(intervalRef.current!);
          return prev;
        }

        const newSnake = [newHead, ...prev];

        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(generateFood(newSnake));
          setScore((s) => s + 0.5);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 300);

    return () => clearInterval(intervalRef.current!);
  }, [direction, food]);

  const restart = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setIsGameOver(false);
    setScore(0);
  };

  return (
    <div className="snake-wrapper" ref={gameRef} tabIndex={0}>
      <h2 className="snake-title">Snake Game</h2>
      <div className="score-display">Score: {score}</div>
      <div
        className="snake-board"
        style={{
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 20px)`,
          gridTemplateRows: `repeat(${BOARD_SIZE}, 20px)`,
        }}
      >
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, i) => {
          const x = i % BOARD_SIZE;
          const y = Math.floor(i / BOARD_SIZE);
          const isSnake = snake.some((s) => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={i}
              className={`cell ${
                isSnake ? "snake" : isFood ? "food" : "empty"
              }`}
            />
          );
        })}
      </div>
      {isGameOver && (
        <div className="snake-over">
          <p>Game Over!</p>
          <button className="restart-button" onClick={restart}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
