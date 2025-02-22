import { View, Text } from "@/components/general/Themed";
import React from "react";
import Card from "@/components/general/Card";
import { StyleSheet, useColorScheme } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { WorkoutWithExercises } from "@/types/models";
import dayjs from "dayjs";
import { getBestSet } from "@/services/setServices";
import { getWorkOutTotalWeight } from "@/services/workoutService";
import { calculateDuration } from "@/utils/time";
import Colors from "@/constants/Colors";

type WorkOutListItemProps = {
  workout: WorkoutWithExercises;
};

const createStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    card: {
      gap: 8,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    boldText: {
      fontWeight: "bold",
    },
    grayText: {
      color: Colors[colorScheme].tabIconDefault,
    },
    footer: {
      flexDirection: "row",
      gap: 20,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: Colors[colorScheme].tabIconDefault,
      marginTop: 10,
      paddingTop: 10,
    },
  });

export default function WorkOutListItem({ workout }: WorkOutListItemProps) {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createStyles(colorScheme);

  return (
    <Card
      href={`/workout/${workout.id}`}
      title={dayjs(workout.createdAt).format("HH:mm dddd, D MMM")}
      style={styles.card}
    >
      <View style={styles.row}>
        <Text style={styles.boldText}>Exercise</Text>
        <Text style={styles.boldText}>Best Set</Text>
      </View>

      {workout.exercises.map((exercise) => {
        const bestSets = getBestSet(exercise.sets);
        return (
          <View key={exercise.id} style={styles.row}>
            <Text style={styles.grayText}>
              {exercise.sets.length} x {exercise.name}
            </Text>

            {bestSets && (
              <Text style={styles.grayText}>
                {bestSets.reps}{" "}
                {bestSets.weight ? `x ${bestSets.weight} kg` : "reps"}
              </Text>
            )}
          </View>
        );
      })}

      <View style={styles.footer}>
        <Text>
          <FontAwesome5
            name="clock"
            size={16}
            color={Colors[colorScheme].tabIconDefault}
          />{" "}
          {calculateDuration(workout.createdAt, workout.finishedAt)}
        </Text>
        <Text>
          <FontAwesome5
            name="weight-hanging"
            size={16}
            color={Colors[colorScheme].tabIconDefault}
          />{" "}
          {getWorkOutTotalWeight(workout)} kg
        </Text>
      </View>
    </Card>
  );
}
