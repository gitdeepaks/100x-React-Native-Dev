import { View, Text } from "@/components/general/Themed";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1 }}>
      <Text>WorkoutScreen: {id}</Text>
    </View>
  );
}
