import React from "react";
import "./Leaderboard.css";
import { fetchScores, ScoreRecord } from "../../utils/firestore";
import { isTimeBasedGame } from "../../utils/scoreConfig";

const Leaderboard = () => {
  const [scores, setScores] = React.useState<ScoreRecord[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [gameIndex, setGameIndex] = React.useState(0);

  React.useEffect(() => {
    fetchScores().then((data) => {
      setScores(data);
      setLoading(false);
    });
  }, []);

  const uniqueGameSet = new Set<string>();
  scores.forEach((s) => uniqueGameSet.add(s.game));
  const games = Array.from(uniqueGameSet);
  const selectedGame = games[gameIndex] || "";

  const handlePrev = () => {
    setGameIndex((prev) => (prev - 1 + games.length) % games.length);
  };

  const handleNext = () => {
    setGameIndex((prev) => (prev + 1) % games.length);
  };

  const filteredScores = scores
    .filter((s) => s.game === selectedGame)
    .sort((a, b) =>
      isTimeBasedGame(selectedGame) ? a.score - b.score : b.score - a.score
    )
    .slice(0, 5);

  return (
    <div className="leaderboard-container">
      <h3 className="leaderboard-title">🏆 Leaderboard</h3>
      {games.length > 1 && (
        <div className="leaderboard-switcher">
          <button onClick={handlePrev} className="game-button">
            ←
          </button>
          <span className="game-title">{selectedGame.replace("Game", "")}</span>
          <button onClick={handleNext} className="game-button">
            →
          </button>
        </div>
      )}

      {loading ? (
        <p className="leaderboard-loading">Loading...</p>
      ) : filteredScores.length === 0 ? (
        <p className="leaderboard-empty">No scores yet.</p>
      ) : (
        <ul className="leaderboard-list">
          {filteredScores.map((score, index) => {
            const display = isTimeBasedGame(score.game)
              ? `${score.score.toFixed(3)}s`
              : `${score.score} pts`;

            return (
              <li key={index} className="leaderboard-entry">
                <span className="rank">{index + 1}. </span>
                <span className="leaderboard-nickname">{score.nickname}</span> ➤
                <span className="leaderboard-details"> {display}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
