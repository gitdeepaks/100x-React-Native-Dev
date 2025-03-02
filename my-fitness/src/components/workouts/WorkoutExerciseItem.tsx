import { StyleSheet } from "react-native";
import { View, Text } from "../general/Themed";
import React from "react";
import Card from "../general/Card";
import { ExerciseWithSets } from "@/types/models";
import { getBestSet } from "@/services/setServices";
import Colors from "@/constants/Colors";

type WorkoutExerciseItemProps = {
  exercise: ExerciseWithSets;
};

export default function WorkoutExerciseItem({
  exercise,
}: WorkoutExerciseItemProps) {
  const bestSet = getBestSet(exercise.sets);
  return (
    <Card title={exercise.name}>
      {exercise.sets.map((exerciseSet, index) => (
        <View
          key={exerciseSet.id}
          style={[
            styles.setRow,
            {
              backgroundColor:
                exerciseSet.id === bestSet?.id
                  ? Colors.dark.tint + "50"
                  : "transparent",
            },
          ]}
        >
          <Text style={styles.setIndex}>{index + 1}</Text>
          <Text style={styles.setInfo}>
            {exerciseSet.reps} X{" "}
            {exerciseSet.weight ? `${exerciseSet.weight} kg` : "reps"}
          </Text>
          {exerciseSet.oneRM && (
            <Text style={styles.oneRM}>{Math.floor(exerciseSet.oneRM)} Kg</Text>
          )}
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  setRow: {
    flexDirection: "row",
    gap: 15,
    padding: 8,
  },
  setIndex: {
    fontSize: 15,
    color: "gray",
  },
  setInfo: {
    fontSize: 16,
  },
  oneRM: {
    fontSize: 16,
    marginLeft: "auto",
    fontWeight: "bold",
  },
});
