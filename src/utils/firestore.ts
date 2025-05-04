import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  getDocs,
  orderBy,
  where,
} from "firebase/firestore";

import { isTimeBasedGame } from "./scoreConfig";

export type ScoreRecord = {
  game: string;
  userId: string;
  score: number;
  nickname: string;
  timestamp: number;
};

const getUserId = () => {
  let id = localStorage.getItem("anonUserId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("anonUserId", id);
  }
  return id;
};

export const saveScoreIfHighest = async (
  game: string,
  score: number,
  nickname: string
) => {
  const userId = getUserId();
  const scoresRef = collection(db, "scores");

  const isTimeBased = isTimeBasedGame(game);

  const q = query(
    scoresRef,
    where("game", "==", game),
    where("userId", "==", userId),
    orderBy("score", isTimeBased ? "asc" : "desc")
  );

  const snapshot = await getDocs(q);
  const best = snapshot.docs[0]?.data()?.score;

  const isNewBest =
    best === undefined || (isTimeBased ? score < best : score > best);

  if (isNewBest) {
    await addDoc(scoresRef, {
      game,
      score,
      nickname,
      userId,
      timestamp: serverTimestamp(),
      ...(isTimeBased && { timeInSeconds: score }),
    });
  }
};

export const fetchScores = async (game?: string): Promise<ScoreRecord[]> => {
  try {
    let q = query(collection(db, "scores"), orderBy("timestamp", "desc"));
    if (game) {
      q = query(
        collection(db, "scores"),
        where("game", "==", game),
        orderBy(
          "score",
          ["NumberSortGame", "ReactionTimeGame"].includes(game) ? "asc" : "desc"
        )
      );
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        game: data.game,
        score: data.score,
        timestamp: data.timestamp?.toMillis?.() || Date.now(),
        userId: data.userId,
        nickname: data.nickname || "Anonymous",
        timeInSeconds: data.timeInSeconds,
      };
    });
  } catch (error) {
    console.error("Error fetching scores:", error);
    return [];
  }
};
