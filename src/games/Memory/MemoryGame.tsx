import React from "react";
import "./MemoryGame.css";

import { saveScore } from "../../utils/firestore";
import { getNicknameOrPrompt } from "../../helpers/getNicknameOrPrompt";

type Card = {
  id: number;
  emoji: string;
};

const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊"];

const generateCards = (): Card[] => {
  const cards = [...emojis, ...emojis].map((emoji, i) => ({
    id: i,
    emoji,
  }));
  return cards.sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const [cards, setCards] = React.useState<Card[]>(generateCards());
  const [flipped, setFlipped] = React.useState<number[]>([]);
  const [matched, setMatched] = React.useState<number[]>([]);
  const [score, setScore] = React.useState(0);
  const isProcessing = React.useRef(false);

  const handleClick = (index: number) => {
    if (
      isProcessing.current ||
      flipped.includes(index) ||
      matched.includes(index)
    )
      return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      isProcessing.current = true;
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        setMatched((prev) => [...prev, first, second]);
        setScore((prev) => prev + 1);
      }
      setTimeout(() => {
        setFlipped([]);
        isProcessing.current = false;
      }, 1000);
    }
  };

  const handleGameOver = async () => {
    const nickname = await getNicknameOrPrompt();
    if (nickname && score > 0) {
      await saveScore("MemoryGame", score, nickname);
    }
  };

  const resetGame = () => {
    setCards(generateCards());
    setFlipped([]);
    setMatched([]);
    handleGameOver();
    setScore(0);
    isProcessing.current = false;
  };

  return (
    <div className="game-container">
      <h2 className="game-title">🧠 Memory Game</h2>
      <div className="score-display">Matched: {score}</div>
      <div className="memory-grid">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <div
              key={card.id}
              className={`memory-card ${
                matched.includes(index) ? "matched" : isFlipped ? "flipped" : ""
              }`}
              onClick={() => handleClick(index)}
            >
              {isFlipped ? card.emoji : "❓"}
            </div>
          );
        })}
      </div>
      <p className="instruction">
        Flip and match all cards as fast as you can!
      </p>
      <button className="restart-button" onClick={resetGame}>
        Restart
      </button>
    </div>
  );
};

export default MemoryGame;
