import React from "react";
import "./DashboardNavigator.css";

import { updateVisitorCount } from "../../utils/metrics";
import DailyChallenge from "../DailyChallenge/DailyChallenge";
import UserProfileStats from "../UserProfileStats/UserProfileStats";
import Leaderboard from "../Leaderboard/Leaderboard";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import GameAchievements from "../GameAchievements/GameAchievements";

const DashboardNavigator = ({
  onSelectGame,
}: {
  onSelectGame: (game: string) => void;
}) => {
  const [expandedDashboard, setExpandedDashboard] =
    React.useState<boolean>(false);
  const [expandedUser, setExpandedUser] = React.useState<boolean>(false);
  const [visitors, setVisitors] = React.useState<number | null>(null);

  const handleBuyCoffee = () => {
    window.open("https://buycoffee.to/adateo", "_blank");
  };

  React.useEffect(() => {
    updateVisitorCount().then(setVisitors);
  }, []);

  return (
    <section className="dashboard-section">
      <div className="dashboard-header-row">
        <div
          className="dashboard-toggle"
          onClick={() => setExpandedDashboard(!expandedDashboard)}
        >
          {expandedDashboard ? "📂 Hide dashboard" : "📁 Show dashboard"}
        </div>
        <div
          className="dashboard-toggle"
          onClick={() => setExpandedUser(!expandedUser)}
        >
          {expandedUser ? "📂 Hide User stats" : "📁 Show User stats"}
        </div>
        <div className="dashboard-toggle" onClick={handleBuyCoffee}>
          ☕ Buy Me a Coffee
        </div>
        <div className="visitor-button">👥 Visitors: {visitors}</div>
      </div>
      {expandedUser && (
        <div className="dashboard-content">
          <ProgressTracker />
          <GameAchievements />
        </div>
      )}
      {expandedDashboard && (
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
