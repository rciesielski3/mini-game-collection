import React from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

import { db } from "../firebase";

const useVisitorTracking = () => {
  React.useEffect(() => {
    const authInstance = getAuth();

    const signInAndTrack = async () => {
      try {
        const result = await signInAnonymously(authInstance);
        const uid = result.user.uid;

        const ref = doc(db, "unique_visitors", uid);
        await setDoc(ref, { timestamp: serverTimestamp() }, { merge: true });
      } catch (error) {
        console.error("Anonymous sign-in or tracking failed:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        const ref = doc(db, "unique_visitors", user.uid);
        setDoc(ref, { timestamp: serverTimestamp() }, { merge: true });
      } else {
        signInAndTrack();
      }
    });

    return () => unsubscribe();
  }, []);
};

export default useVisitorTracking;
