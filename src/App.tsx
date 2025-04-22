import React, { useState } from "react";
import "./App.css";

import useVisitorTracking from "./hooks/useVisitorTracking";
import GameModal from "./components/GameModal/GameModal";
import GameCard from "./components/GameCard/GameCard";
import Footer from "./components/Footer/Footer";
import DashboardNavigator from "./components/DashboardNavigator/DashboardNavigator";

const GAMES = [
  {
    emoji: "🐍",
    title: "Snake",
    description: "Classic snake game with a twist.",
    component: "Snake",
  },
  {
    emoji: "🦖",
    title: "Dino Jump",
    description: "Jump over obstacles in this fast-paced game.",
    component: "DinoJump",
  },
  {
    emoji: "❌ 🔵",
    title: "Tic-Tac-Toe",
    description: "The timeless 2-player strategy game.",
    component: "TicTacToe",
  },
  {
    emoji: "🔨",
    title: "Whack a Mole",
    description: "Tap moles as they appear before time runs out.",
    component: "WhackAMole",
  },
  {
    emoji: "⚡",
    title: "Reaction Time",
    description: "Test how fast your reflexes are!",
    component: "ReactionTimeGame",
  },
  {
    emoji: "🏎️",
    title: "Racing Game",
    description: "Dodge the obstacles and race for high score!",
    component: "RacingGame",
  },
  {
    emoji: "🎨",
    title: "Color Match",
    description: "Match the color block with the target color.",
    component: "SquaresGame",
  },
  {
    emoji: "🧠",
    title: "Memory Game",
    description: "Flip and match all cards as fast as you can!",
    component: "MemoryGame",
  },
  {
    emoji: "⏱️",
    title: "Reaction Sequence",
    description: "Remembers sequences (like Simon Says) and repeat them.",
    component: "ReactionSequenceGame",
  },
  {
    emoji: "🧮",
    title: "Math Quickfire",
    description: "Solve math problems as fast as you can!",
    component: "MathQuickfireGame",
  },
];

const App = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  useVisitorTracking();

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1 className="app-title">Mini Game Collection</h1>
        <p className="app-description">
          Explore fun mini games to relax or challenge your brain 🧠
        </p>
      </header>
      <DashboardNavigator onSelectGame={(game) => setSelectedGame(game)} />
      <main className="game-scroll-area">
        <div className="game-grid">
          {GAMES.map((game) => (
            <GameCard
              key={game.title}
              emoji={game.emoji}
              title={game.title}
              description={game.description}
              onClick={() => setSelectedGame(game.component)}
            />
          ))}
        </div>
      </main>
      <Footer />
      <GameModal
        gameName={selectedGame}
        onClose={() => setSelectedGame(null)}
      />
    </div>
  );
};

export default App;
