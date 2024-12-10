import { StyleSheet } from "react-native";
import React from "react";
import { Text, View } from "@/components/general/Themed";

export default function CurrentWorkoutScreen() {
  return (
    <View style={styles.container}>
      <Text>CurrentWorkoutScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
