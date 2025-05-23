import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export type AchievementState = {
  snake10: boolean;
  played3Days: boolean;
  racingWins: boolean;
  allGames: boolean;
  updatedAt: number;
};

export const saveUserAchievements = async (
  userId: string,
  data: Omit<AchievementState, "updatedAt">
) => {
  const ref = doc(db, "achievements", userId);
  await setDoc(ref, { ...data, updatedAt: Date.now() }, { merge: true });
};

export const getUserAchievements = async (
  userId: string
): Promise<AchievementState | null> => {
  const ref = doc(db, "achievements", userId);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as AchievementState) : null;
};
