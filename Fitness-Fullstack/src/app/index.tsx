import { StyleSheet, useColorScheme } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import { View, Text } from "@/components/general/Themed";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Link href="/workout/current">
        <Text>Resume Workout</Text>
      </Link>
      <Text style={{ fontSize: 30 }}>Title</Text>
      <Link href="/workout/123">
        <Text>Open Workout with id 123</Text>
      </Link>
      <Text>index</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
});
