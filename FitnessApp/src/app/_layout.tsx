import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import {
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import Colors from "@/constants/Colors";

import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import * as SQLite from "expo-sqlite";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { dbName, getDb } from "@/db";

DarkTheme.colors.primary = Colors.dark.tint;
DefaultTheme.colors.primary = Colors.light.tint;

const db = SQLite.openDatabaseSync(dbName);

getDb();

// SQLite.deleteDatabaseSync(dbName);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  useDrizzleStudio(db);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="workout/current" options={{ title: "Workout" }} />
          <Stack.Screen name="workout/[id]" options={{ title: "Workout" }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
