import React from "react";
import "./WhackAMole.css";

const NUM_HOLES = 9;

const WhackAMole: React.FC = () => {
  const [score, setScore] = React.useState(0);
  const [activeHole, setActiveHole] = React.useState<number | null>(null);
  const [gameOn, setGameOn] = React.useState(false);
  const moleTimerRef = React.useRef<number | null>(null);

  const startGame = () => {
    setScore(0);
    setGameOn(true);
    setActiveHole(null);

    moleTimerRef.current = window.setInterval(() => {
      const randomIndex = Math.floor(Math.random() * NUM_HOLES);
      setActiveHole(randomIndex);
    }, 1000);
  };

  const stopGame = () => {
    setGameOn(false);
    setActiveHole(null);
    if (moleTimerRef.current) clearInterval(moleTimerRef.current);
  };

  const handleWhack = (index: number) => {
    if (index === activeHole) {
      setScore((prev) => prev + 1);
      setActiveHole(null);
    }
  };

  return (
    <div className="game-container">
      <h2 className="game-title">🔨 Whack a Mole</h2>
      <div className="score-display">Score: {score}</div>

      <div className="grid">
        {Array.from({ length: NUM_HOLES }).map((_, i) => (
          <div key={i} className="hole" onClick={() => handleWhack(i)}>
            {activeHole === i && <div className="mole" />}
          </div>
        ))}
      </div>
      <p className="instruction">Click the green mole when it pops up!</p>
      {!gameOn ? (
        <button className="game-button" onClick={startGame}>
          Start Game
        </button>
      ) : (
        <button className="restart-button" onClick={stopGame}>
          Stop
        </button>
      )}
    </div>
  );
};

export default WhackAMole;
