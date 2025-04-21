import React from "react";
import ReactDOM from "react-dom";
import "./GameModal.css";

import { saveScore } from "../../utils/firestore";
import SnakeGame from "../../games/Snake/SnakeGame";
import DinoGame from "../../games/DinoJump/DinoGame";
import TicTacToe from "../../games/TicTacToe/TicTacToe";
import WhackAMole from "../../games/WhackAMole/WhackAMole";
import ReactionTimeGame from "../../games/ReactionTime/ReactionTimeGame";
import RacingGame from "../../games/Racing/RacingGame";
import SquaresGame from "../../games/Squares/SquaresGame";
import MemoryGame from "../../games/Memory/MemoryGame";
import AdBanner from "../AdBanner/AdBanner";

type Props = {
  gameName: string | null;
  onClose: () => void;
};

const GameModal = ({ gameName, onClose }: Props) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleScoreSubmit = (score: number) => {
    if (gameName) {
      saveScore(gameName, score);
    }
  };

  if (!gameName) return null;

  const renderGame = () => {
    switch (gameName) {
      case "Snake":
        return <SnakeGame onScore={handleScoreSubmit} />;
      case "DinoJump":
        return <DinoGame onScore={handleScoreSubmit} />;
      case "TicTacToe":
        return <TicTacToe onScore={handleScoreSubmit} />;
      case "WhackAMole":
        return <WhackAMole onScore={handleScoreSubmit} />;
      case "ReactionTimeGame":
        return <ReactionTimeGame onScore={handleScoreSubmit} />;
      case "RacingGame":
        return <RacingGame onScore={handleScoreSubmit} />;
      case "SquaresGame":
        return <SquaresGame onScore={handleScoreSubmit} />;
      case "MemoryGame":
        return <MemoryGame onScore={handleScoreSubmit} />;

      default:
        return null;
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ❌
        </button>
        {renderGame()}
        <AdBanner />
      </div>
    </div>,
    document.body
  );
};

export default GameModal;
