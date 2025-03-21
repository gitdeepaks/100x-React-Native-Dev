import { Text } from "@/components/general/Themed";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import dummyWorkouts from "@/data/dummyWorkouts";
import WorkoutExerciseItem from "@/components/workouts/WorkoutExerciseItem";
import { FlatList, StyleSheet } from "react-native";
import dayjs from "dayjs";

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams();

  const workout = dummyWorkouts.find((workout) => workout.id === id);

  if (!workout) {
    return <Text>Workout not found</Text>;
  }

  return (
    <FlatList
      data={workout.exercises}
      contentContainerStyle={{
        gap: 8,
        padding: 8,
      }}
      renderItem={({ item }) => <WorkoutExerciseItem exercise={item} />}
      ListHeaderComponent={
        <>
          <Text style={styles.title}>WorkOut Details</Text>
          <Text style={styles.date}>
            {dayjs(workout.createdAt).format("HH:mm dddd, D MMM")}
          </Text>
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 18,
    marginBottom: 20,
  },
});
