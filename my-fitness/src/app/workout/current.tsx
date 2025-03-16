import { View, Text } from "@/components/general/Themed";
import { WorkoutExerciseItem } from "@/components/logger/WorkoutExerciseItem";
import React from "react";
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";

import { useHeaderHeight } from "@react-navigation/elements";
import { Stack } from "expo-router";
import CustomButton from "@/components/general/CustomButton";

export default function CurrentWorkoutScreen() {
  const headerHeight = useHeaderHeight();
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <CustomButton
              onPress={() => console.warn("done")}
              title="Done"
              style={{ width: "auto", padding: 7, paddingHorizontal: 15 }}
            />
          ),
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
        keyboardVerticalOffset={headerHeight}
      >
        <FlatList
          data={[1, 2]}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          renderItem={() => <WorkoutExerciseItem />}
        />
      </KeyboardAvoidingView>
    </>
  );
}
