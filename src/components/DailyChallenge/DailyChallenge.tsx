import React from "react";
import "./DailyChallenge.css";

const GAMES = [
  "Snake",
  "DinoJump",
  "TicTacToe",
  "WhackAMole",
  "ReactionTimeGame",
  "RacingGame",
  "SquaresGame",
  "MemoryGame",
];

const getDailyGame = (): string => {
  const today = new Date().toISOString().split("T")[0];
  const seed = today
    .split("-")
    .join("")
    .split("")
    .reduce((acc, val) => acc + val.charCodeAt(0), 0);
  return GAMES[seed % GAMES.length];
};

const DailyChallenge: React.FC<{ onPlay: (game: string) => void }> = ({
  onPlay,
}) => {
  const [completed, setCompleted] = React.useState<boolean>(false);
  const dailyGame = getDailyGame();

  const handlePlay = () => {
    onPlay(dailyGame);
  };

  const markComplete = () => {
    localStorage.setItem(`daily-complete-${dailyGame}`, "true");
    setCompleted(true);
  };

  React.useEffect(() => {
    const status = localStorage.getItem(`daily-complete-${dailyGame}`);
    setCompleted(status === "true");
  }, [dailyGame]);

  return (
    <div className="daily-challenge">
      <h3 className="daily-title">🎯 Daily Challenge</h3>
      <p>
        Today's game: <strong>{dailyGame}</strong>
      </p>
      {completed ? (
        <p className="challenge-complete">✔️ Completed</p>
      ) : (
        <button className="game-button" onClick={handlePlay}>
          Play Now
        </button>
      )}
      {!completed && (
        <button className="complete-button" onClick={markComplete}>
          Mark as Done
        </button>
      )}
    </div>
  );
};

export default DailyChallenge;
