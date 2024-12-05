import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 25, fontWeight: "600" }}>ProfileScreen</Text>
      <Link href="/">Home</Link>
    </View>
  );
}

const styles = StyleSheet.create({});
