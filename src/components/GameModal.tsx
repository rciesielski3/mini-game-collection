import React from "react";
import ReactDOM from "react-dom";

import SnakeGame from "../games/Snake/SnakeGame";
import DinoGame from "../games/DinoJump/DinoGame";
import TicTacToe from "../games/TicTacToe/TicTacToe";
import WhackAMole from "../games/WhackAMole/WhackAMole";
import ReactionTimeGame from "../games/ReactionTime/ReactionTimeGame";
import RacingGame from "../games/Racing/RacingGame";

type Props = {
  gameName: string | null;
  onClose: () => void;
};

const GameModal = ({ gameName, onClose }: Props) => {
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
      default:
        return null;
    }
  };

  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "radial-gradient(circle, #b7c4ca 0%, #5c6471 100%)",
          padding: "2rem",
          borderRadius: "10px",
          position: "relative",
          width: "90%",
          maxWidth: "600px",
        }}
      >
        <button
          onClick={onClose}
          style={{ position: "absolute", right: 10, top: 10 }}
        >
          ❌
        </button>
        {renderGame()}
      </div>
    </div>,
    document.body
  );
};

export default GameModal;
