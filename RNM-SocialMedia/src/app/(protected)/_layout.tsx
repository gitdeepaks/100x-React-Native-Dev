import React from "react";
import { Slot, Redirect, Stack } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { ActivityIndicator } from "react-native";

export default function ProtectedLayout() {
  const { session, isLoading } = useAuth();

  if (isLoading) return <ActivityIndicator />;

  if (!session) return <Redirect href="/sign-in" />;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Feed" }} />
      <Stack.Screen name="post/[id]" options={{ title: "Post" }} />
    </Stack>
  );
}
