import React from "react";
import "./GameCard.css";

type GameCardProps = {
  emoji: string;
  title: string;
  description: string;
  onClick: () => void;
};

const GameCard: React.FC<GameCardProps> = ({
  emoji,
  title,
  description,
  onClick,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className="game-card"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="game-emoji" aria-hidden="true">
        {emoji}
      </div>
      <h3 className="game-card-title">{title}</h3>
      <p className="game-description">{description}</p>
    </div>
  );
};

export default GameCard;
