import { View, Text } from "@/components/general/Themed";
import { WorkoutExerciseItem } from "@/components/logger/WorkoutExerciseItem";
import React from "react";
import { FlatList } from "react-native";

export default function CurrentWorkoutScreen() {
  return (
    <FlatList
      data={[1, 2]}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      renderItem={() => <WorkoutExerciseItem />}
    />
  );
}
