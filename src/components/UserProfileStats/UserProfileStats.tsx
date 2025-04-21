import React from "react";
import { fetchScores, ScoreRecord } from "../../utils/firestore";
import "./UserProfileStats.css";

interface Props {
  onSelectGame?: (game: string) => void;
}

const UserProfileStats: React.FC<Props> = ({ onSelectGame }) => {
  const [scores, setScores] = React.useState<ScoreRecord[]>([]);

  React.useEffect(() => {
    fetchScores().then(setScores);
  }, []);

  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  const uniqueTopGames: string[] = [];
  for (const s of sortedScores) {
    if (!uniqueTopGames.includes(s.game)) uniqueTopGames.push(s.game);
    if (uniqueTopGames.length >= 3) break;
  }

  const lastPlayed = scores.sort((a, b) => b.timestamp - a.timestamp)[0]?.game;

  return (
    <div className="profile-stats dashboard-section">
      <h3 className="profile-title">👤 Your Stats</h3>
      <div className="profile-section">
        <strong>Top Games:</strong>
        <ul>
          {uniqueTopGames.map((game, i) => (
            <li key={i} onClick={() => onSelectGame?.(game)}>
              {game}
            </li>
          ))}
        </ul>
      </div>

      {lastPlayed && (
        <div className="profile-section">
          <strong>Last Played:</strong>
          <p>{lastPlayed}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfileStats;
