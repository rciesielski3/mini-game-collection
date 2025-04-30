import React from "react";
import "./ReactionSequenceGame.css";

import { saveScoreIfHighest } from "../../utils/firestore";
import { getNicknameOrPrompt } from "../../helpers/getNicknameOrPrompt";

const SEQUENCE_LENGTH = 3;

const ReactionSequenceGame = () => {
  const [sequence, setSequence] = React.useState<number[]>([]);
  const [playerInput, setPlayerInput] = React.useState<number[]>([]);
  const [showing, setShowing] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [gameOn, setGameOn] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  const generateSequence = () => {
    const newSeq = Array.from({ length: SEQUENCE_LENGTH + score }, () =>
      Math.floor(Math.random() * 4)
    );
    setSequence(newSeq);
    setPlayerInput([]);
    setShowing(true);

    let delay = 0;
    newSeq.forEach((idx, i) => {
      setTimeout(() => {
        highlight(idx);
      }, (i + 1) * 700);
      delay = (i + 1) * 700;
    });

    setTimeout(() => setShowing(false), delay + 600);
  };

  const highlight = (idx: number) => {
    const el = document.getElementById(`rsq-${idx}`);
    if (el) {
      el.classList.add("active");
      setTimeout(() => el.classList.remove("active"), 300);
    }
  };

  const handleGameOver = async () => {
    const nickname = await getNicknameOrPrompt();
    if (nickname && score > 0) {
      await saveScoreIfHighest("ReactionSequenceGame", score, nickname);
    }
  };

  const handleBoxClick = (idx: number) => {
    if (showing || !gameOn) return;
    const nextInput = [...playerInput, idx];
    setPlayerInput(nextInput);

    if (sequence[nextInput.length - 1] !== idx) {
      setMessage("Wrong! Try again.");
      setGameOn(false);
      handleGameOver();
      return;
    }

    if (nextInput.length === sequence.length) {
      setScore((s) => s + 1);
      setTimeout(() => generateSequence(), 800);
    }
  };

  const startGame = () => {
    setScore(0);
    setMessage(null);
    setGameOn(true);
    generateSequence();
  };

  return (
    <div className="game-container">
      <h2 className="game-title">⏱️ Reaction Sequence</h2>
      <div className="score-display">Score: {score}</div>

      <div className="rsq-grid">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            id={`rsq-${i}`}
            className="rsq-box"
            onClick={() => handleBoxClick(i)}
          ></div>
        ))}
      </div>
      <p className="instruction">
        Repeat the pattern by clicking the boxes in order
      </p>
      {message && <p className="game-over">{message}</p>}
      {!gameOn ? (
        <button className="game-button" onClick={startGame}>
          Start
        </button>
      ) : null}
    </div>
  );
};

export default ReactionSequenceGame;
