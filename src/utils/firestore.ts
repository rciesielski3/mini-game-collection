import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  getDocs,
  orderBy,
  where,
} from "firebase/firestore";

import { db } from "../firebase";
import { isTimeBasedGame } from "./scoreConfig";

export type ScoreRecord = {
  game: string;
  userId: string;
  score: number;
  nickname: string;
  timestamp: number;
};

const getOrCreateUserId = (): string => {
  let id = localStorage.getItem("anonUserId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("anonUserId", id);
  }
  return id;
};

export const saveScore = async (
  game: string,
  score: number,
  nickname: string
): Promise<void> => {
  const userId = getOrCreateUserId();
  const isTimeBased = isTimeBasedGame(game);
  const scoresRef = collection(db, "scores");

  const docData: any = {
    game,
    score,
    nickname,
    userId,
    timestamp: serverTimestamp(),
  };

  if (isTimeBased) {
    docData.timeInSeconds = score;
  }

  try {
    const docRef = await addDoc(scoresRef, docData);
    console.log(
      `[saveScore] Score saved with ID: "${docRef.id}", for game: ${docData.game} with score: ${docData.score}`
    );
  } catch (err) {
    console.error("[saveScore] Failed to save score:", err);
  }
};

export const fetchScores = async (
  game?: string,
  userId?: string
): Promise<ScoreRecord[]> => {
  try {
    let q = query(collection(db, "scores"), orderBy("timestamp", "desc"));

    if (game && userId) {
      const isTimeBased = isTimeBasedGame(game);
      q = query(
        collection(db, "scores"),
        where("game", "==", game),
        where("userId", "==", userId),
        orderBy("score", isTimeBased ? "asc" : "desc")
      );
    } else if (game) {
      const isTimeBased = isTimeBasedGame(game);
      q = query(
        collection(db, "scores"),
        where("game", "==", game),
        orderBy("score", isTimeBased ? "asc" : "desc")
      );
    } else if (userId) {
      q = query(
        collection(db, "scores"),
        where("userId", "==", userId),
        orderBy("timestamp", "desc")
      );
    }

    const snapshot = await getDocs(q);

    return snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          game: data.game,
          score: data.score,
          timestamp: data.timestamp?.toMillis?.() || Date.now(),
          userId: data.userId,
          nickname: data.nickname || "Anonymous",
        };
      })
      .filter((r) => r.nickname !== "Anonymous");
  } catch (error) {
    console.error("[fetchScores] Error fetching scores:", error);
    return [];
  }
};
