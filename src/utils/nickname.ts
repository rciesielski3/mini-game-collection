export const getNicknameOrPrompt = async (): Promise<string | null> => {
  let nickname = localStorage.getItem("nickname");

  if (!nickname) {
    const userInput = prompt("Enter your nickname to save your score!");
    nickname = userInput ? userInput.trim() : null;

    if (nickname) {
      localStorage.setItem("nickname", nickname);
    }
  }

  return nickname ?? null;
};
