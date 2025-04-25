import React, { useEffect, useState } from "react";
import "./Leaderboard.css";
import { fetchScores, ScoreRecord } from "../../utils/firestore";

const Leaderboard = () => {
  const [scores, setScores] = useState<ScoreRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
                <span className="rank">{index + 1}.</span>
                <span className="game">{score.game}</span>
                <span className="points">{score.score} pts</span>
                {score.timestamp && (
                  <span className="timestamp">
                    {new Date(score.timestamp).toLocaleDateString()}
                  </span>
                )}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
