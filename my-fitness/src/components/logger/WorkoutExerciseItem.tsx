import React from "react";
import Card from "@/components/general/Card";
import { View, Text } from "@/components/general/Themed";
import { StyleSheet } from "react-native";
import SetItems from "./SetItems";
import { ExerciseSet } from "@/types/models";
import CustomButton from "../general/CustomButton";

export const WorkoutExerciseItem = () => {
  const sets: ExerciseSet[] = [
    {
      id: "1",
      weight: 20,
      reps: 10,
      exerciseId: "e1",
    },
    {
      id: "2",
      weight: 50,
      reps: 5,
      exerciseId: "e1",
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
        {sets.map((item, index) => (
          <SetItems key={item.id} index={index} set={item} />
        ))}
      </View>
      <CustomButton
        title="+ Add Set"
        type="link"
        onPress={() => console.warn("add set")}
        style={{
          width: "100%",
          marginTop: 10,
        }}
      />
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
