import React from "react";

export type TriviaQuestion = {
  question: string;
  correctAnswer: string;
  options: string[];
};

const shuffle = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);

const decode = (html: string): string => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export const useTriviaQuestions = (amount: number = 1) => {
  const [questions, setQuestions] = React.useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const fetchQuestions = async (): Promise<void> => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=${amount}&type=multiple`
      );

      if (res.status === 429) {
        console.warn("Rate limited, retrying in 2 seconds...");
        await new Promise((res) => setTimeout(res, 2000));
        return fetchQuestions();
      }

      const data = await res.json();

      const decoded: TriviaQuestion[] = (data?.results ?? []).map((q: any) => ({
        question: decode(q.question),
        correctAnswer: decode(q.correct_answer),
        options: shuffle([
          ...q.incorrect_answers.map(decode),
          decode(q.correct_answer),
        ]),
      }));

      setQuestions(decoded);
    } catch (err) {
      console.log(err);
      console.error("Trivia fetch failed", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchQuestions();
  }, [amount]);

  return {
    questions,
    loading,
    error,
    refetch: fetchQuestions,
  };
};
