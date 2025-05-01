import React from "react";
import "./Leaderboard.css";

import { fetchScores, ScoreRecord } from "../../utils/firestore";

const Leaderboard = () => {
  const [scores, setScores] = React.useState<ScoreRecord[]>([]);
  const [loading, setLoading] = React.useState(true);

  const timeBasedGames = ["NumberSortGame", "ReactionTimeGame"];

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
            .sort((a, b) => {
              const aIsTime = timeBasedGames.includes(a.game);
              const bIsTime = timeBasedGames.includes(b.game);

              if (aIsTime && bIsTime) return a.score - b.score;
              if (!aIsTime && !bIsTime) return b.score - a.score;

              return aIsTime ? -1 : 1;
            })
            .slice(0, 5)
            .map((score, index) => {
              const isTimeBased = timeBasedGames.includes(score.game);
              const display = isTimeBased
                ? `${score.score.toFixed(3)}s`
                : `${score.score} pts`;

              return (
                <li key={index} className="leaderboard-entry">
                  <span className="rank">{index + 1}. </span>
                  <span className="leaderboard-nickname">
                    {score.nickname}
                  </span>{" "}
                  -
                  <span className="leaderboard-details">
                    {" "}
                    {score.game} • {display}
                  </span>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
