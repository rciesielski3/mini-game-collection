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

  React.useEffect(() => {
    updateVisitorCount().then(setVisitors);
  }, []);

  const toggleSection = (section: "dashboard" | "user") => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const dashboardOpen = expandedSection === "dashboard";
  const userOpen = expandedSection === "user";

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <span className="brand">🎮 Mini Game Collection</span>

          <nav className="topnav" aria-label="Dashboard and links">
            <div className="topnav-group">
              <button
                type="button"
                className="navtab"
                aria-expanded={dashboardOpen}
                aria-controls={expandedSection === "dashboard" ? "dashboard-panel" : undefined}
                onClick={() => toggleSection("dashboard")}
              >
                📁 Dashboard <span className="caret" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="navtab"
                aria-expanded={userOpen}
                aria-controls={expandedSection === "user" ? "user-stats-panel" : undefined}
                onClick={() => toggleSection("user")}
              >
                🚀 User stats <span className="caret" aria-hidden="true" />
              </button>
            </div>

            <div className="topnav-group">
              <a
                className="btn-ghost"
                href="https://buycoffee.to/adateo"
                target="_blank"
                rel="noopener noreferrer"
              >
                ☕ Buy me a coffee
              </a>
              <span className="visitors">
                <span aria-hidden="true">👥</span>{" "}
                <strong>{visitors ?? "–"}</strong> visitors
              </span>
            </div>
          </nav>
        </div>
      </header>

      {dashboardOpen && (
        <div className="dashboard-content" id="dashboard-panel">
          <DailyChallenge onPlay={onSelectGame} />
          <Leaderboard />
        </div>
      )}

      {userOpen && (
        <div className="dashboard-content" id="user-stats-panel">
          <ProgressTracker />
          <UserProfileStats />
          <GameAchievements />
        </div>
      )}
    </>
  );
};

export default DashboardNavigator;
