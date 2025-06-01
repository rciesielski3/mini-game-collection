import React from "react";
import ReactDOM from "react-dom";

import "./GameModal.css";

import {
  ColorMatchGame,
  DinoGame,
  MathQuickfireGame,
  MemoryGame,
  NumberSortGame,
  OddOneOutGame,
  RacingGame,
  ReactionSequenceGame,
  ReactionTimeGame,
  SnakeGame,
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
      case "ColorMatchGame":
        return <ColorMatchGame />;
      case "DinoJump":
        return <DinoGame />;
      case "MathQuickfireGame":
        return <MathQuickfireGame />;
      case "MemoryGame":
        return <MemoryGame />;
      case "NumberSortGame":
        return <NumberSortGame />;
      case "OddOneOutGame":
        return <OddOneOutGame />;
      case "RacingGame":
        return <RacingGame />;
      case "ReactionSequenceGame":
        return <ReactionSequenceGame />;
      case "ReactionTimeGame":
        return <ReactionTimeGame />;
      case "Snake":
        return <SnakeGame />;
      case "TicTacToe":
        return <TicTacToe />;
      case "WhackAMole":
        return <WhackAMole />;
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
