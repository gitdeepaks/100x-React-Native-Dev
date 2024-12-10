import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import Colors from "@/constants/Colors";

DarkTheme.colors.primary = Colors.dark.tint;
DefaultTheme.colors.primary = Colors.light.tint;

export default function RootLayout() {
  const colorScheme = useColorScheme();

  console.log(colorScheme);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
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
    </ThemeProvider>
  );
}
