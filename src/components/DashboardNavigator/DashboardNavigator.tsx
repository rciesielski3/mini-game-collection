import React from "react";
import "./DashboardNavigator.css";

import DailyChallenge from "../DailyChallenge/DailyChallenge";
import UserProfileStats from "../UserProfileStats/UserProfileStats";

const DashboardNavigator = ({
  onSelectGame,
}: {
  onSelectGame: (game: string) => void;
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  return (
    <section className="dashboard-section">
      <div className="dashboard-toggle" onClick={() => setExpanded(!expanded)}>
        📂 {expanded ? "Hide Dashboard" : "Show Dashboard"}
      </div>
      {expanded && (
        <div className="dashboard-content">
          <div className="dashboard-box">
            <DailyChallenge onPlay={onSelectGame} />
          </div>
          <div className="dashboard-box">
            <UserProfileStats />
          </div>
        </div>
      )}
    </section>
  );
};

export default DashboardNavigator;
