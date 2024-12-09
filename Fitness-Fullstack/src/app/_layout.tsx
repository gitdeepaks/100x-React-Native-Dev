import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {" "}
      <Stack.Screen name="index" options={{ title: "Home" }}></Stack.Screen>
      <Stack.Screen
        name="workout/current"
        options={{ title: "Workout" }}
      ></Stack.Screen>
      <Stack.Screen
        name="workout/[id]"
        options={{ title: "Workout" }}
      ></Stack.Screen>
    </Stack>
  );
}