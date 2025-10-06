import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { FIREBASE_AUTH } from "@/config/firebase-config";
import Constants from "expo-constants";
import {
  signInWithCredential,
  GoogleAuthProvider,
  signOut,
  User,
} from "firebase/auth";
import { useState, useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleLogin() {
  const auth = FIREBASE_AUTH;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Hardcoded Expo proxy URI (must match app.json and Google Cloud)
  const redirectUri = "https://auth.expo.dev/@chaaanuwu/FarmPal";

  // Web OAuth Client ID from Google Cloud
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Constants.expoConfig?.extra?.GOOGLE_WEB_CLIENT_ID,
    redirectUri,
    scopes: ["openid", "profile", "email"],
  });

  useEffect(() => {
    const handleGoogleResponse = async () => {
      if (response?.type === "success") {
        setLoading(true);
        const { authentication } = response;

        if (authentication?.idToken) {
          const credential = GoogleAuthProvider.credential(
            authentication.idToken,
            authentication.accessToken
          );

          try {
            const userCredential = await signInWithCredential(auth, credential);
            setUser(userCredential.user);
            console.log("Firebase user:", userCredential.user);
          } catch (error) {
            console.error("Firebase auth error:", error);
          } finally {
            setLoading(false);
          }
        }
      }
    };

    handleGoogleResponse();
  }, [response, auth]);

  const signInWithGoogle = async () => {
    try {
      // ✅ Do NOT pass useProxy here
      await promptAsync();
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const signOutGoogle = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return {
    user,
    loading,
    request,
    signInWithGoogle,
    signOutGoogle,
  };
}

