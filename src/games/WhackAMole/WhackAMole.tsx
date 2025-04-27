import React from "react";
import "./WhackAMole.css";

import { saveScoreIfHighest } from "../../utils/firestore";
import { getNicknameOrPrompt } from "../../helpers/getNicknameOrPrompt";

const NUM_HOLES = 9;
const GAME_DURATION = 30;

const WhackAMole = () => {
  const [score, setScore] = React.useState(0);
  const [activeHole, setActiveHole] = React.useState<number | null>(null);
  const [gameOn, setGameOn] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(GAME_DURATION);
  const moleTimerRef = React.useRef<number | null>(null);
  const countdownRef = React.useRef<number | null>(null);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameOn(true);
    setActiveHole(null);

    moleTimerRef.current = window.setInterval(() => {
      const randomIndex = Math.floor(Math.random() * NUM_HOLES);
      setActiveHole(randomIndex);
    }, 1000);

    countdownRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleGameOver = async () => {
    const nickname = await getNicknameOrPrompt();
    if (nickname && score > 0) {
      await saveScoreIfHighest("WhackAMoleGame", score, nickname);
    }
  };

  const stopGame = () => {
    setGameOn(false);
    setActiveHole(null);
    if (moleTimerRef.current) clearInterval(moleTimerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    if (score > 0) handleGameOver();
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
      <div className="score-display">Time Left: {timeLeft}s</div>
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
