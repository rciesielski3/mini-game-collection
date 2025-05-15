import React from "react";
import "./../UserProfileStats/UserProfileStats.css";

import { fetchScores } from "../../utils/firestore";

const ProgressTracker = () => {
  const [gamesPlayed, setGamesPlayed] = React.useState<number>(0);
  const [bestReaction, setBestReaction] = React.useState<number | null>(null);
  const [mostPlayed, setMostPlayed] = React.useState<string | null>(null);
  const [streak, setStreak] = React.useState<number>(0);

  const userId = localStorage.getItem("anonUserId");

  const getCurrentStreak = (dates: string[]): number => {
    const today = new Date();
    const uniqueSet = new Set<string>();
    dates.forEach((d) => uniqueSet.add(d));
    const sortedDays = Array.from(uniqueSet).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );

    let streak = 0;
    for (let i = 0; i < sortedDays.length; i++) {
      const date = new Date(sortedDays[i]);
      const expected = new Date();
      expected.setDate(today.getDate() - i);
      if (date.toDateString() === expected.toDateString()) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  React.useEffect(() => {
    if (!userId) return;

    fetchScores(undefined, userId).then((data) => {
      const uniqueDays = data.map((s) => new Date(s.timestamp).toDateString());
      const currentStreak = getCurrentStreak(uniqueDays);

      setStreak(currentStreak);
      setGamesPlayed(data.length);

      const reactionScores = data.filter((d) => d.game === "ReactionTimeGame");
      if (reactionScores.length) {
        const best = Math.min(...reactionScores.map((s) => s.score));
        setBestReaction(best);
      }

      const gameCount = data.reduce<Record<string, number>>((acc, curr) => {
        acc[curr.game] = (acc[curr.game] || 0) + 1;
        return acc;
      }, {});
      const mostPlayedGame = Object.entries(gameCount).sort(
        (a, b) => b[1] - a[1]
      )[0]?.[0];
      setMostPlayed(mostPlayedGame || null);
    });
  }, [userId]);

  return (
    <div className="profile-stats dashboard-section">
      <h3 className="profile-title">📊 Your Progress</h3>
      <div className="profile-section">
        <p>Total games played: {gamesPlayed}</p>
        <p>Longest streak: {streak} days</p>
        <p>
          Best Reaction Time:{" "}
          {bestReaction !== null ? `${bestReaction.toFixed(3)}s` : "–"}
        </p>
        <p>Most Played: {mostPlayed || "–"}</p>
      </div>
    </div>
  );
};

export default ProgressTracker;
