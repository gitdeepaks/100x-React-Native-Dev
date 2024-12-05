import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }}></Stack.Screen>
      <Stack.Screen name="camera" options={{ headerShown: false }} />
    </Stack>
  );
}

const styles = StyleSheet.create({});
