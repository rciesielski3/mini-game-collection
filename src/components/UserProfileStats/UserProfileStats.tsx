import React from "react";
import "./UserProfileStats.css";

import { fetchScores, ScoreRecord } from "../../utils/firestore";

type Props = {
  onSelectGame?: (game: string) => void;
};

// Saved game ids look like "NumberSortGame" or "DinoJump".
// Turn them into readable names: drop the "Game" suffix and split CamelCase.
const formatGameName = (id: string): string =>
  id.replace(/Game$/, "").replace(/([a-z])([A-Z])/g, "$1 $2");

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

  const hasScores = scores.length > 0;
  const gamesPlayed = new Set(scores.map((s) => s.game)).size;

  return (
    <div className="profile-stats user-stats">
      <header className="user-stats-head">
        <span className="user-stats-icon" aria-hidden="true">
          👤
        </span>
        <h3 className="user-stats-title">Your Stats</h3>
      </header>

      <dl className="user-stats-kpis">
        <div className="user-stats-kpi">
          <dt>Runs</dt>
          <dd>{hasScores ? scores.length : "—"}</dd>
        </div>
        <div className="user-stats-kpi">
          <dt>Games</dt>
          <dd>{hasScores ? gamesPlayed : "—"}</dd>
        </div>
      </dl>

      <section className="user-stats-block">
        <h4 className="user-stats-label">Top games</h4>
        {uniqueTopGames.length > 0 ? (
          <ol className="user-stats-ranking">
            {uniqueTopGames.map((game, i) => (
              <li key={game} className="user-stats-rank">
                <span className="user-stats-rank-num" aria-hidden="true">
                  {i + 1}
                </span>
                <button
                  type="button"
                  className="user-stats-rank-name"
                  onClick={() => onSelectGame?.(game)}
                >
                  {formatGameName(game)}
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <p className="user-stats-empty">—</p>
        )}
      </section>

      <section className="user-stats-last">
        <h4 className="user-stats-last-label">last played</h4>
        {lastPlayed ? (
          <p className="user-stats-last-game">
            <span aria-hidden="true">🎮</span> {formatGameName(lastPlayed)}
          </p>
        ) : (
          <p className="user-stats-empty">—</p>
        )}
      </section>
    </div>
  );
};

export default UserProfileStats;
