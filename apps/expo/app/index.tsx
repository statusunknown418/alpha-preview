import { useSession } from "@clerk/clerk-expo";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Page() {
  const { session } = useSession();

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello Worlds save</Text>
        <Text style={styles.subtitle}>Some Text</Text>
        <Text style={styles.subtitle}>{session?.user.id}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
