import React from "react";
import "./GameAchievements.css";

import { fetchScores } from "../../utils/firestore";
import { saveUserAchievements } from "../../utils/storeAchievements";

const GameAchievements = () => {
  const [achievements, setAchievements] = React.useState({
    snake10: false,
    played3Days: false,
    racingWins: false,
    allGames: false,
  });

  const userId = localStorage.getItem("anonUserId");

  React.useEffect(() => {
    if (!userId) return;

    fetchScores(undefined, userId).then(async (data) => {
      const hasSnake10 = data.some(
        (s) => s.game === "SnakeGame" && s.score >= 10
      );
      const gameDays = new Set(
        data.map((s) => new Date(s.timestamp).toDateString())
      );
      const racingHigh = data.some(
        (s) => s.game === "RacingGame" && s.score >= 3
      );
      const distinctGames = new Set(data.map((s) => s.game));

      const newAchievements = {
        snake10: hasSnake10,
        played3Days: gameDays.size >= 3,
        racingWins: racingHigh,
        allGames: distinctGames.size >= 10,
      };

      setAchievements(newAchievements);
      await saveUserAchievements(userId, newAchievements);
    });
  }, [userId]);

  return (
    <div className="profile-stats dashboard-section">
      <h3 className="profile-title">🏅 Achievements</h3>
      <ul className="profile-section">
        <li>{achievements.snake10 ? "✅" : "🔒"} Scored 10+ in Snake</li>
        <li>
          {achievements.played3Days ? "✅" : "🔒"} Played on 3 different days
        </li>
        <li>
          {achievements.racingWins ? "✅" : "🔒"} Earned 3+ in Racing Game
        </li>
        <li>{achievements.allGames ? "✅" : "🔒"} Played all 10 games</li>
      </ul>
    </div>
  );
};

export default GameAchievements;
