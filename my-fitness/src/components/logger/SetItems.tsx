import React from "react";
import { View, Text, TextInput } from "@/components/general/Themed";
import { ExerciseSet } from "@/types/models";
import { StyleSheet } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import CustomButton from "../general/CustomButton";

type SetItems = {
  index: number;
  set: ExerciseSet;
};

export default function SetItems({ index, set }: SetItems) {
  const [weight, setWeight] = React.useState(set.weight?.toString() || "");
  const [reps, setReps] = React.useState(set.reps?.toString() || "");

  const hanldeWeightChange = () => {
    console.warn("handle weight change", weight);
  };

  const handleRepsChange = () => {
    console.warn("handle reps change", reps);
  };

  const renderRightActions = () => (
    <CustomButton
      onPress={() => console.warn("delete set", set.id)}
      title="Delete"
      type="link"
      style={{
        width: "auto",
        padding: 5,
      }}
      color="crimson"
    />
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        <Text style={styles.setNumber}>{index + 1}</Text>
        <TextInput
          placeholder="50"
          value={weight}
          onChangeText={setWeight}
          style={styles.input}
          keyboardType="numeric"
          onBlur={hanldeWeightChange}
        />
        <TextInput
          placeholder="8"
          value={reps}
          onChangeText={setReps}
          style={styles.input}
          keyboardType="numeric"
          onBlur={handleRepsChange}
        />
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    gap: 5,
    alignItems: "center",
  },
  setNumber: {
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    width: 60,
    padding: 5,
    paddingVertical: 7,
    fontSize: 16,
    textAlign: "center",
  },
});
