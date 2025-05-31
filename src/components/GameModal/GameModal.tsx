import React from "react";
import ReactDOM from "react-dom";
import "./GameModal.css";

import {
  DinoGame,
  MathQuickfireGame,
  MemoryGame,
  NumberSortGame,
  OddOneOutGame,
  PatternMemoryGame,
  RacingGame,
  ReactionSequenceGame,
  ReactionTimeGame,
  SnakeGame,
  SquaresGame,
  TicTacToe,
  WhackAMole,
} from "../../games";

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
      case "ReactionSequenceGame":
        return <ReactionSequenceGame />;
      case "MathQuickfireGame":
        return <MathQuickfireGame />;
      case "NumberSortGame":
        return <NumberSortGame />;
      case "OddOneOutGame":
        return <OddOneOutGame />;
      case "PatternMemoryGame":
        return <PatternMemoryGame />;
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
      </div>
    </div>,
    document.body
  );
};

export default GameModal;
