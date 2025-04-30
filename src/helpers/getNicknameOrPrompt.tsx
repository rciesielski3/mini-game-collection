import React from "react";
import { createRoot } from "react-dom/client";

import NicknameModal from "../components/NicknameModal/NicknameModal";

export const getNicknameOrPrompt = (): Promise<string> => {
  return new Promise((resolve) => {
    const saved = localStorage.getItem("nickname");
    if (saved) {
      resolve(saved);
      return;
    }

    const container = document.createElement("div");
    document.body.appendChild(container);

    const root = createRoot(container);

    const handleSubmit = (nickname: string) => {
      localStorage.setItem("nickname", nickname);
      resolve(nickname);
      root.unmount();
      document.body.removeChild(container);
    };

    root.render(<NicknameModal onSubmit={handleSubmit} />);
  });
};
