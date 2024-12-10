import { StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "@/components/general/Themed";

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text>WorkoutScreen : {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
