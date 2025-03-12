import React from "react";
import Card from "@/components/general/Card";
import { View, Text } from "@/components/general/Themed";
import { StyleSheet } from "react-native";
import SetItems from "./SetItems";
import { ExerciseSet } from "@/types/models";

export const WorkoutExerciseItem = () => {
  const sets: ExerciseSet[] = [
    {
      id: "1",
      weight: 20,
      reps: 10,
      exerciseId: "",
    },
    {
      id: "2",
      weight: 20,
      reps: 10,
      exerciseId: "",
    },
    {
      id: "3",
      weight: 20,
      reps: 10,
      exerciseId: "",
    },
    {
      id: "4",
      weight: 20,
      reps: 10,
      exerciseId: "",
    },
  ];
  return (
    <Card title="Exercise">
      <View style={styles.header}>
        <Text style={styles.setNumber}>Set</Text>
        <Text style={styles.setInfo}>Kg</Text>
        <Text style={styles.setInfo}>Reps</Text>
      </View>

      <View
        style={{
          gap: 5,
        }}
      >
        {[1, 2, 3].map((item, index) => (
          <SetItems index={index} />
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginVertical: 10,
    gap: 5,
  },
  setNumber: {
    marginRight: "auto",
    fontWeight: "bold",
  },
  setInfo: {
    width: 60,
    textAlign: "center",
    fontWeight: "bold",
  },
});
