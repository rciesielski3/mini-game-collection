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

export type ScoreRecord = {
  game: string;
  score: number;
  timestamp: number;
};

export const saveScore = async (game: string, score: number) => {
  try {
    await addDoc(collection(db, "scores"), {
      game,
      score,
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.error("Error saving score:", err);
  }
};

export const fetchScores = async (game?: string): Promise<ScoreRecord[]> => {
  try {
    let q = query(collection(db, "scores"), orderBy("timestamp", "desc"));

    if (game) {
      q = query(
        collection(db, "scores"),
        where("game", "==", game),
        orderBy("score", "desc")
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        game: data.game,
        score: data.score,
        timestamp: data.timestamp?.toMillis?.() || Date.now(),
      };
    });
  } catch (error) {
    console.error("Error fetching scores:", error);
    return [];
  }
};
