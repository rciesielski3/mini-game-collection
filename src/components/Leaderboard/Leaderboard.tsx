import React from "react";
import "./Leaderboard.css";

import { fetchScores, ScoreRecord } from "../../utils/firestore";

const Leaderboard = () => {
  const [scores, setScores] = React.useState<ScoreRecord[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchScores().then((data) => {
      setScores(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="leaderboard-container">
      <h3 className="leaderboard-title">🏆 Leaderboard</h3>
      {loading ? (
        <p className="leaderboard-loading">Loading...</p>
      ) : scores.length === 0 ? (
        <p className="leaderboard-empty">No scores yet.</p>
      ) : (
        <ul className="leaderboard-list">
          {scores
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map((score, index) => (
              <li key={index} className="leaderboard-entry">
                <span className="rank">{index + 1}. </span>
                <span className="game-score">
                  {score.game}, score: {score.score}
                </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
