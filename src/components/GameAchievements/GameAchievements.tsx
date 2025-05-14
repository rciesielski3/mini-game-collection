import React from "react";

import "./GameAchievements.css";

const GameAchievements = () => {
  return (
    <div className="profile-stats dashboard-section">
      <h3 className="profile-title">🏅 Achievements</h3>
      <ul className="profile-section">
        <li>✅ Scored 10+ in Snake</li>
        <li>✅ Completed 3 Daily Challenges</li>
        <li>🔒 Win 3 times in Racing Game</li>
        <li>🔒 Play all 10 games once</li>
      </ul>
    </div>
  );
};

export default GameAchievements;
