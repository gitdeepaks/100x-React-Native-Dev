import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Camera() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>camera</Text>
      <Link href="/">Home</Link>
    </View>
  );
}
