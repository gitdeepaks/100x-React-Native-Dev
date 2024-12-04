import { Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>Home Screen</Text>
      <Link href="/camera">Camera</Link>
    </View>
  );
}
