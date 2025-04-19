import React from "react";

import "./ReactionTimeGame.css";

const ReactionTimeGame = () => {
  const [waiting, setWaiting] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const [startTime, setStartTime] = React.useState<number | null>(null);
  const [reactionTime, setReactionTime] = React.useState<number | null>(null);
  const timeoutRef = React.useRef<number | null>(null);

  const startTest = () => {
    setReactionTime(null);
    setWaiting(true);
    setReady(false);

    const delay = Math.floor(Math.random() * 3000) + 2000;
    timeoutRef.current = window.setTimeout(() => {
      setStartTime(Date.now());
      setReady(true);
      setWaiting(false);
    }, delay);
  };

  const handleClick = () => {
    if (waiting) {
      clearTimeout(timeoutRef.current!);
      setWaiting(false);
      alert("Too soon! Wait for green.");
    } else if (ready && startTime) {
      const end = Date.now();
      setReactionTime(end - startTime);
      setReady(false);
    }
  };

  React.useEffect(() => {
    return () => clearTimeout(timeoutRef.current!);
  }, []);

  return (
    <div
      className={`reaction-wrapper ${
        ready ? "green" : waiting ? "waiting" : "idle"
      }`}
      onClick={handleClick}
    >
      {!waiting && !ready && !reactionTime && (
        <button className="reaction-start" onClick={startTest}>
          Start Test
        </button>
      )}
      {waiting && <p>Wait for green...</p>}
      {ready && <p>Click!</p>}
      {reactionTime && <p>Your reaction time: {reactionTime}ms</p>}
    </div>
  );
};

export default ReactionTimeGame;
