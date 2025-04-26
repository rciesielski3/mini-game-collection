import React from "react";
import "./MathQuickfireGame.css";

import { saveScoreIfHighest } from "../../utils/firestore";

const GAME_DURATION = 30;

const generateQuestion = () => {
  const a = Math.floor(Math.random() * 10);
  const b = Math.floor(Math.random() * 10);
  return {
    a,
    b,
    answer: a + b,
  };
};

const MathQuickfireGame = () => {
  const [question, setQuestion] = React.useState(generateQuestion());
  const [input, setInput] = React.useState("");
  const [score, setScore] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(GAME_DURATION);
  const [gameOn, setGameOn] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setQuestion(generateQuestion());
    setGameOn(true);
    setInput("");
    inputRef.current?.focus();
  };

  React.useEffect(() => {
    if (!gameOn) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOn(false);
          if (score > 0) saveScoreIfHighest("MathQuickfireGame", score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameOn]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(input) === question.answer) {
      setScore((s) => s + 1);
    }
    setQuestion(generateQuestion());
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <div className="game-container">
      <h2 className="game-title">🧮 Math Quickfire</h2>
      <div className="score-display">Score: {score}</div>
      <div className="score-display">Time Left: {timeLeft}s</div>

      {gameOn ? (
        <form onSubmit={handleSubmit} className="math-form">
          <label className="math-question">
            {question.a} + {question.b} =
          </label>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
            className="math-input"
            autoFocus
          />
        </form>
      ) : (
        <button className="game-button" onClick={startGame}>
          Start Game
        </button>
      )}
      <p className="instruction">Solve as many as you can in 30 seconds</p>
    </div>
  );
};

export default MathQuickfireGame;
