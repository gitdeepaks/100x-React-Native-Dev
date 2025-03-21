import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Redirect, Slot } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";

export default function AuthLayout() {
  const { isLoading, session } = useAuth();
  if (isLoading) <ActivityIndicator />;

  if (session) return <Redirect href="/" />;

  return <Slot />;
}
