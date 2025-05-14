import React from "react";

import "./ProgressTracker.css";

const ProgressTracker = () => {
  return (
    <div className="profile-stats dashboard-section">
      <h3 className="profile-title">📊 Your Progress</h3>
      <ul className="profile-section">
        <li>Total games played: 42</li>
        <li>Longest streak: 5 days</li>
        <li>Best Reaction Time: 0.362s</li>
        <li>Most Played: NumberSortGame</li>
      </ul>
    </div>
  );
};

export default ProgressTracker;
