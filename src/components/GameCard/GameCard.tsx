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
  return (
    <div className="game-card" onClick={onClick} role="button" tabIndex={0}>
      <div className="game-emoji">{emoji}</div>
      <h3 className="game-title">{title}</h3>
      <p className="game-description">{description}</p>
    </div>
  );
};

export default GameCard;
