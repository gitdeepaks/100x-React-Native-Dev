import React from "react";
import { View, Text, TextInput } from "@/components/general/Themed";
import { ExerciseSet } from "@/types/models";

type SetItems = {
  index: number;
  set: ExerciseSet;
};

export default function SetItems({ index, set }: SetItems) {
  return (
    <View>
      <Text>{index + 1}</Text>
      <TextInput placeholder="50" />
    </View>
  );
}
