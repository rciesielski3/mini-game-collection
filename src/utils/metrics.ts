import { doc, getDoc, updateDoc, increment, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const updateVisitorCount = async (): Promise<number> => {
  const ref = doc(db, "metrics", "visitors");

  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) {
    await setDoc(ref, { count: 1 });
    return 1;
  }

  const current = snapshot.data().count || 0;
  await updateDoc(ref, { count: increment(1) });
  return current + 1;
};
