import { useEffect, useState, useCallback } from "react";
import { FIREBASE_AUTH } from "@/config/firebase-config";
import { User, signOut } from "firebase/auth";

export default function useAuth() {
  const [user, setUser] = useState<User | false | null>(null); // null = loading

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) setUser(firebaseUser);
      else setUser(false);
    });

    return () => unsubscribe();
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await signOut(FIREBASE_AUTH);
      setUser(false); // optional, will also be updated by onAuthStateChanged
    } catch (err) {
      console.log("Logout error:", err);
    }
  }, []);

  return { user, logout }; // return user + logout
}