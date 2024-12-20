import { View, Text } from "@/components/general/Themed";
import WorkoutExerciseItem from "@/components/logger/WorkoutExerciseItem";
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";

import { useHeaderHeight } from "@react-navigation/elements";
import { Redirect, Stack } from "expo-router";
import CustomButton from "@/components/general/CustomButton";
import WorkoutHeader from "@/components/logger/WorkoutHeader";
import SelectExerciseModal from "@/components/logger/SelectExerciseModal";
import { useWorkout } from "@/hooks";

export default function CurrentWorkoutScreen() {
  const currentWorkout = useWorkout((s) => s.currentWorkout);
  const finishWorkOut = useWorkout((s) => s.finishWorkOut);
  const addExercise = useWorkout((s) => s.addExercise);
  const headerHeight = useHeaderHeight();

  if (!currentWorkout) {
    return <Redirect href={"/"} />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <CustomButton
              onPress={() => finishWorkOut()}
              title="Finish"
              style={{ padding: 7, paddingHorizontal: 15, width: "auto" }}
            />
          ),
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={headerHeight}
      >
        <FlatList
          data={currentWorkout.exercises}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          renderItem={({ item }) => <WorkoutExerciseItem exercise={item} />}
          ListHeaderComponent={<WorkoutHeader />}
          ListFooterComponent={
            <SelectExerciseModal
              onSelectExercise={(name) => addExercise(name)}
            />
          }
        />
      </KeyboardAvoidingView>
    </>
  );
}
