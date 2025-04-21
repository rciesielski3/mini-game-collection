import React from "react";
import "./UserProfileStats.css";

export type ScoreRecord = {
  game: string;
  score: number;
  timestamp: number;
};

interface Props {
  scores: ScoreRecord[];
  onSelectGame?: (game: string) => void;
}

const UserProfileStats: React.FC<Props> = ({ scores, onSelectGame }) => {
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  const uniqueTopGames: string[] = [];
  for (const s of sortedScores) {
    if (!uniqueTopGames.includes(s.game)) uniqueTopGames.push(s.game);
    if (uniqueTopGames.length >= 3) break;
  }

  const lastPlayed = scores.sort((a, b) => b.timestamp - a.timestamp)[0]?.game;

  return (
    <div className="profile-stats">
      <h3>👤 Your Stats</h3>
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
