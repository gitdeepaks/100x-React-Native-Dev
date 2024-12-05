import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot } from "expo-router";

export default function ProfileLayout() {
  return <Slot />;
}

const styles = StyleSheet.create({
  Profile: {
    backgroundColor: "blue",
    flex: 1,
  },
});
