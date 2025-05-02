import React from "react";
import "./OddOneOutGame.css";

import { useTriviaQuestions } from "../../hooks/useTriviaQuestions";
import { getNicknameOrPrompt } from "../../helpers/getNicknameOrPrompt";
import { saveScoreIfHighest } from "../../utils/firestore";

const OddOneOutGame = () => {
  const { questions, loading, error } = useTriviaQuestions(5);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<string | null>(null);
  const [score, setScore] = React.useState(0);
  const [result, setResult] = React.useState<"correct" | "wrong" | null>(null);
  const [startTime, setStartTime] = React.useState<number | null>(null);
  const [gameOver, setGameOver] = React.useState(false);
  const [elapsed, setElapsed] = React.useState<number | null>(null);

  const startGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setResult(null);
    setElapsed(null);
    setStartTime(Date.now());
    setGameOver(false);
  };

  const handleClick = async (answer: string) => {
    if (selected || gameOver) return;

    const current = questions[currentIndex];
    const isCorrect = answer === current.correctAnswer;

    setSelected(answer);
    setResult(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setTimeout(async () => {
      setSelected(null);
      setResult(null);

      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((i) => i + 1);
      } else {
        setGameOver(true);
        const totalTime = Date.now() - (startTime ?? Date.now());
        const seconds = parseFloat((totalTime / 1000).toFixed(3));
        setElapsed(seconds);

        if (score === questions.length - 1) {
          const nickname = await getNicknameOrPrompt();
          if (nickname) {
            await saveScoreIfHighest("OddOneOutGame", seconds, nickname);
          }
        }
      }
    }, 1000);
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="game-container">
      <h2 className="game-title">🧠 Odd One Out</h2>

      {!startTime ? (
        <>
          <p className="instruction">
            Answer 5 trivia questions as quickly as you can!
          </p>
          <button className="game-button" onClick={startGame}>
            Start Game
          </button>
        </>
      ) : loading ? (
        <p className="instruction">Loading questions...</p>
      ) : error || !currentQuestion ? (
        <p className="instruction">Failed to load questions.</p>
      ) : gameOver ? (
        <div>
          <p className="score-display">✅ Score: {score} / 5</p>
          {elapsed !== null && (
            <p className="score-display">⏱ Time: {elapsed}s</p>
          )}
          <button className="restart-button" onClick={startGame}>
            Try Again
          </button>
        </div>
      ) : (
        <>
          <p className="instruction">
            Q{currentIndex + 1}: {currentQuestion.question}
          </p>
          <div className="option-grid">
            {currentQuestion.options.map((opt, i) => (
              <button
                key={i}
                className={`option-button ${
                  selected === opt
                    ? result === "correct"
                      ? "correct"
                      : "wrong"
                    : ""
                }`}
                onClick={() => handleClick(opt)}
                disabled={!!selected}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OddOneOutGame;
