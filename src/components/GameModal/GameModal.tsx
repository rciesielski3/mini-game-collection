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
  PatternMemoryGame,
  RacingGame,
  ReactionSequenceGame,
  ReactionTimeGame,
  SnakeGame,
  TicTacToe,
  WhackAMole,
} from "../../games";
import NumberChaseGame from "../../games/NumberChase/NumberChaseGame";

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
      case "NumberChaseGame":
        return <NumberChaseGame />;
      case "OddOneOutGame":
        return <OddOneOutGame />;
      case "PatternMemoryGame":
        return <PatternMemoryGame />;
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
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-label="Game dialog"
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {renderGame()}
      </div>
    </div>,
    document.body
  );
};

export default GameModal;
