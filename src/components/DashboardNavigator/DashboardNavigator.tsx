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
  const [expandedSection, setExpandedSection] = React.useState<
    "dashboard" | "user" | null
  >(null);
  const [visitors, setVisitors] = React.useState<number | null>(null);

  const handleBuyCoffee = () => {
    window.open("https://buycoffee.to/adateo", "_blank");
  };

  React.useEffect(() => {
    updateVisitorCount().then(setVisitors);
  }, []);

  const toggleSection = (section: "dashboard" | "user") => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  return (
    <section className="dashboard-section">
      <div className="dashboard-header-row">
        <div
          className="dashboard-toggle"
          onClick={() => toggleSection("dashboard")}
        >
          {expandedSection === "dashboard"
            ? "📂 Hide dashboard"
            : "📁 Show dashboard"}
        </div>
        <div className="dashboard-toggle" onClick={() => toggleSection("user")}>
          {expandedSection === "user" ? "🔽 User stats" : "🚀 User stats"}
        </div>
        <div className="dashboard-toggle" onClick={handleBuyCoffee}>
          ☕ Buy Me a Coffee
        </div>
        <div className="visitor-button">👥 Visitors: {visitors}</div>
      </div>

      {expandedSection === "dashboard" && (
        <div className="dashboard-content">
          <DailyChallenge onPlay={onSelectGame} />
          <Leaderboard />
        </div>
      )}

      {expandedSection === "user" && (
        <div className="dashboard-content">
          <ProgressTracker />
          <UserProfileStats />
          <GameAchievements />
        </div>
      )}
    </section>
  );
};

export default DashboardNavigator;
