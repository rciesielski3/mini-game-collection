import React from "react";
import "./Leaderboard.css";

import { fetchScores, ScoreRecord } from "../../utils/firestore";

const Leaderboard = () => {
  const [scores, setScores] = React.useState<ScoreRecord[]>([]);

  React.useEffect(() => {
    fetchScores().then(setScores);
  }, []);

  return (
    <div className="leaderboard-container">
      <h3 className="leaderboard-title">🏆 Leaderboard</h3>
      <ul className="leaderboard-list">
        {scores.slice(0, 10).map((score, index) => (
          <li key={index} className="leaderboard-entry">
            <span>{index + 1}.</span> <strong>{score.game}</strong>:{" "}
            {score.score} pts
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
