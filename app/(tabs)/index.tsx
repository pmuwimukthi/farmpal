import useAuth from "@/hooks/useAuth";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Dashboard() {
  const auth = useAuth();

  useEffect(() => {
    if (auth.user === false) {
      router.replace("/login");
    }
  }, [auth.user]);

  if (auth.user === null) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (auth.user === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text>Welcome, {auth.user.displayName || "User"} 👋</Text>
      <Button title="Logout" onPress={auth.logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
});
