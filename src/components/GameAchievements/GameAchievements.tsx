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
        racingWins: racingHigh,
        played3Days: gameDays.size >= 20,
        allGames: distinctGames.size >= 10,
      };

      setAchievements(newAchievements);
      await saveUserAchievements(userId, newAchievements);
    });
  }, [userId]);

  return (
    <div className="profile-stats">
      <h3 className="profile-title">🏅 Achievements</h3>
      <div className="profile-section">
        <p>
          {achievements.snake10 ? "✅" : "🔒"} Scored <strong>10+</strong> in
          Snake
        </p>
        <p>
          {achievements.racingWins ? "✅" : "🔒"} Earned <strong>20+</strong> in
          Racing Game
        </p>
        <p>
          {achievements.played3Days ? "✅" : "🔒"} Played on <strong>3</strong>{" "}
          different days
        </p>
        <p>
          {achievements.allGames ? "✅" : "🔒"} Played all <strong>10</strong>{" "}
          games
        </p>
      </div>
    </div>
  );
};

export default GameAchievements;
