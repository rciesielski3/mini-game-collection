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
  userId: string;
  score: number;
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

export const saveScoreIfHighest = async (game: string, score: number) => {
  const userId = getUserId();
  const scoresRef = collection(db, "scores");
  const q = query(
    scoresRef,
    where("game", "==", game),
    where("userId", "==", userId),
    orderBy("score", "desc")
  );

  const snapshot = await getDocs(q);
  const best = snapshot.docs[0]?.data()?.score || 0;

  if (score > best) {
    await addDoc(scoresRef, {
      game,
      score,
      userId,
      timestamp: serverTimestamp(),
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
        userId: data.userId,
      };
    });
  } catch (error) {
    console.error("Error fetching scores:", error);
    return [];
  }
};
