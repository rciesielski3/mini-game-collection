import React from "react";
import ReactDOM from "react-dom";
import "./GameModal.css";

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

  if (!gameName) return null;

  const renderGame = () => {
    switch (gameName) {
      case "Snake":
        return <SnakeGame />;
      case "DinoJump":
        return <DinoGame />;
      case "TicTacToe":
        return <TicTacToe />;
      case "WhackAMole":
        return <WhackAMole />;
      case "ReactionTimeGame":
        return <ReactionTimeGame />;
      case "RacingGame":
        return <RacingGame />;
      case "SquaresGame":
        return <SquaresGame />;
      case "MemoryGame":
        return <MemoryGame />;
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
