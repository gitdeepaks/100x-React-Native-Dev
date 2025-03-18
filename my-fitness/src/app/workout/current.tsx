import React from "react";
import { Stack } from "expo-router";
import { WorkoutExerciseItem } from "@/components/logger/WorkoutExerciseItem";
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import CustomButton from "@/components/general/CustomButton";
import WorkoutHeader from "@/components/logger/WorkoutHeader";
import SelectExreciseModal from "@/components/logger/SelectExreciseModal";

export default function CurrentWorkoutScreen() {
  const headerHeight = useHeaderHeight();
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <CustomButton
              onPress={() => console.warn("finish workout")}
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
          ListHeaderComponent={<WorkoutHeader />}
          ListFooterComponent={
            <SelectExreciseModal
              onSelectExercise={(name) => {
                console.warn(name, "Selected Exercise");
              }}
            />
          }
        />
      </KeyboardAvoidingView>
    </>
  );
}
