import React from "react";
import "./ReactionTimeGame.css";

import { saveScore } from "../../utils/firestore";
import { getNicknameOrPrompt } from "../../helpers/getNicknameOrPrompt";

const ReactionTimeGame = () => {
  const [isWaiting, setIsWaiting] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);
  const [reactionTime, setReactionTime] = React.useState<number | null>(null);
  const timeoutRef = React.useRef<number | null>(null);
  const startTimeRef = React.useRef<number>(0);

  const startGame = () => {
    setIsWaiting(true);
    setIsReady(false);
    setReactionTime(null);

    timeoutRef.current = window.setTimeout(() => {
      setIsReady(true);
      startTimeRef.current = Date.now();
    }, Math.random() * 2000 + 2000);
  };

  const handleGameOver = async (time: number) => {
    const nickname = await getNicknameOrPrompt();
    if (nickname && time > 0) {
      const timeInSeconds = parseFloat((time / 1000).toFixed(3));
      await saveScore("ReactionTimeGame", timeInSeconds, nickname);
    }
  };

  const handleClick = () => {
    if (isWaiting && !isReady) {
      clearTimeout(timeoutRef.current!);
      setIsWaiting(false);
      setReactionTime(null);
    } else if (isReady) {
      const endTime = Date.now();
      const time = endTime - startTimeRef.current;
      setReactionTime(time);
      handleGameOver(time);
      setIsReady(false);
      setIsWaiting(false);
    }
  };

  const resetGame = () => {
    setReactionTime(null);
    setIsWaiting(false);
    setIsReady(false);
  };

  return (
    <div className="game-container">
      <h2 className="game-title">⚡ Reaction Time</h2>

      <div
        className={`reaction-box ${
          isReady ? "ready" : isWaiting ? "waiting" : ""
        }`}
        onClick={handleClick}
      >
        {isReady
          ? "Click!"
          : isWaiting
          ? "Wait for green..."
          : "Click to start"}
      </div>
      {reactionTime !== null && (
        <>
          <p className="score-display">Your reaction time: {reactionTime} ms</p>
          <button className="restart-button" onClick={resetGame}>
            Try Again
          </button>
        </>
      )}
      <p className="instruction">Click when the box turns green!</p>
      {!isWaiting && reactionTime === null && (
        <button className="game-button" onClick={startGame}>
          Start
        </button>
      )}
    </div>
  );
};

export default ReactionTimeGame;
