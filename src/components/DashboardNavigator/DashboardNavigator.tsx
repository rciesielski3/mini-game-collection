import React from "react";
import "./DashboardNavigator.css";

import DailyChallenge from "../DailyChallenge/DailyChallenge";
import UserProfileStats from "../UserProfileStats/UserProfileStats";
import Leaderboard from "../Leaderboard/Leaderboard";

const DashboardNavigator = ({
  onSelectGame,
}: {
  onSelectGame: (game: string) => void;
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  return (
    <section className="dashboard-section">
      <div className="dashboard-toggle" onClick={() => setExpanded(!expanded)}>
        {expanded ? "📂 Hide dashboard" : "📁 Show dashboard"}
      </div>
      {expanded && (
        <div className="dashboard-content">
          <DailyChallenge onPlay={onSelectGame} />
          <UserProfileStats />
          <Leaderboard />
        </div>
      )}
    </section>
  );
};

export default DashboardNavigator;
