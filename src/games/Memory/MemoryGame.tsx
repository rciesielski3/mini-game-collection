import React from "react";

import "./MemoryGame.css";

const CARD_VALUES = ["A", "B", "C", "D", "E", "F"];

const shuffle = (array: string[]) => {
  return [...array, ...array].sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const [cards, setCards] = React.useState<string[]>([]);
  const [flipped, setFlipped] = React.useState<number[]>([]);
  const [matched, setMatched] = React.useState<number[]>([]);

  React.useEffect(() => {
    setCards(shuffle(CARD_VALUES));
  }, []);

  const handleClick = (index: number) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    )
      return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  return (
    <div className="memory-container">
      <h2>Memory Game</h2>
      <div className="memory-grid">
        {cards.map((value, index) => (
          <div
            key={index}
            className={`card ${
              flipped.includes(index) || matched.includes(index)
                ? "flipped"
                : ""
            }`}
            onClick={() => handleClick(index)}
          >
            {flipped.includes(index) || matched.includes(index) ? value : "?"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
