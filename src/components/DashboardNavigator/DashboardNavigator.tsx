import React from "react";
import "./DashboardNavigator.css";

import { updateVisitorCount } from "../../utils/metrics";
import DailyChallenge from "../DailyChallenge/DailyChallenge";
import UserProfileStats from "../UserProfileStats/UserProfileStats";
import Leaderboard from "../Leaderboard/Leaderboard";

const DashboardNavigator = ({
  onSelectGame,
}: {
  onSelectGame: (game: string) => void;
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [visitors, setVisitors] = React.useState<number | null>(null);

  React.useEffect(() => {
    updateVisitorCount().then(setVisitors);
  }, []);

  return (
    <section className="dashboard-section">
      <div className="dashboard-header-row">
        <div
          className="dashboard-toggle"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "📂 Hide dashboard" : "📁 Show dashboard"}
        </div>
        <div className="visitor-button">👥 Visitors: {visitors}</div>
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
