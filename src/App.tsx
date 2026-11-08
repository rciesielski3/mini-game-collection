import React, { useState } from "react";
import "./App.css";

import { DashboardNavigator, Footer, GameCard, GameModal } from "./components";

const GAMES = [
  {
    emoji: "🎨",
    title: "Color Match",
    description: "Match the color block with the target color.",
    component: "ColorMatchGame",
  },
  {
    emoji: "🦖",
    title: "Dino Jump",
    description: "Jump over obstacles in this fast-paced game.",
    component: "DinoJump",
  },
  {
    emoji: "🧮",
    title: "Math Quickfire",
    description: "Solve math problems as fast as you can!",
    component: "MathQuickfireGame",
  },
  {
    emoji: "🧠",
    title: "Memory Game",
    description: "Flip and match all cards as fast as you can!",
    component: "MemoryGame",
  },
  {
    emoji: "🪿",
    title: "Number Chase",
    description: "Tap numbers 1–25 in order as fast as possible!",
    component: "NumberChaseGame",
  },
  {
    emoji: "🔢",
    title: "Number Sort",
    description:
      "Quickly sort numbers in the correct order before time runs out!",
    component: "NumberSortGame",
  },
  {
    emoji: "➖",
    title: "Odd One Out",
    description: "Spot the item that doesn't belong as fast as you can!",
    component: "OddOneOutGame",
  },
  {
    emoji: "💠",
    title: "Pattern Memory",
    description: "Repeat the growing sequence of colors from memory!",
    component: "PatternMemoryGame",
  },
  {
    emoji: "🏎️",
    title: "Racing Game",
    description: "Dodge the obstacles and race for high score!",
    component: "RacingGame",
  },
  {
    emoji: "⏱️",
    title: "Reaction Sequence",
    description: "Remembers sequences (like Simon Says) and repeat them.",
    component: "ReactionSequenceGame",
  },
  {
    emoji: "⚡",
    title: "Reaction Time",
    description: "Test how fast your reflexes are!",
    component: "ReactionTimeGame",
  },
  {
    emoji: "🐍",
    title: "Snake",
    description: "Classic snake game with a twist.",
    component: "Snake",
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
];

const getDayOfYear = (date: Date): number => {
  const start = Date.UTC(date.getFullYear(), 0, 0);
  const today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((today - start) / 86400000);
};

const App = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const featured = GAMES[getDayOfYear(new Date()) % GAMES.length];

  const playRandomGame = () => {
    const game = GAMES[Math.floor(Math.random() * GAMES.length)];
    setSelectedGame(game.component);
  };

  return (
    <div className="app-wrapper">
      <DashboardNavigator onSelectGame={(game) => setSelectedGame(game)} />

      <main className="wrap main">
        <header className="hero">
          <div className="hero-top">
            <div className="hero-copy">
              <p className="eyebrow">Game collection · {GAMES.length} games</p>
              <h1>
                Short plays.
                <br />
                <span className="accent-word">Zero</span> waiting.
              </h1>
              <p className="subtitle">
                Explore fun mini games to relax or challenge your brain 🧠
              </p>
              <div className="hero-cta">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={playRandomGame}
                >
                  ▶ Play a random game
                </button>
                <span className="hint">About a minute each</span>
              </div>
            </div>

            <aside className="spotlight" aria-label="Featured game">
              <span className="spot-label">Featured today</span>
              <div className="spot-emoji" aria-hidden="true">
                {featured.emoji}
              </div>
              <h2>{featured.title}</h2>
              <p>{featured.description}</p>
              <button
                type="button"
                className="spot-link"
                onClick={() => setSelectedGame(featured.component)}
              >
                Play now →
              </button>
            </aside>
          </div>
        </header>

        <section aria-labelledby="all-games-heading">
          <div className="section-head">
            <h2 id="all-games-heading">All games</h2>
            <span>{GAMES.length} games</span>
          </div>
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
        </section>
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
