import React from "react";
import "./NicknameModal.css";

type NicknameModalProps = {
  onSubmit: (nickname: string) => void;
};

const funnyNicknames = [
  "SpeedyTurtle",
  "LazyLion",
  "HappyHippo",
  "CrazyKoala",
  "NinjaBanana",
  "SirLaughsALot",
  "DancingPineapple",
  "CaptainZebra",
  "QueenBee",
  "SneakyPanda",
];

const getRandomNickname = () =>
  funnyNicknames[Math.floor(Math.random() * funnyNicknames.length)];

const NicknameModal: React.FC<NicknameModalProps> = ({ onSubmit }) => {
  const [nickname, setNickname] = React.useState(getRandomNickname());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      onSubmit(nickname.trim());
    }
  };

  return (
    <div className="nickname-modal-overlay">
      <div className="nickname-modal-content">
        <h1>Game over</h1>
        <h2>Enter your nickname</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder={nickname}
            autoFocus
            className="nickname-input"
          />
          <button type="submit" className="nickname-submit-button">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default NicknameModal;
