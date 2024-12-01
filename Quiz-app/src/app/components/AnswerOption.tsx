import { StyleSheet, Text, View } from "react-native";
import React from "react";

export const AnswerOption = () => {
  return (
    <View style={styles.container}>
      <Text>AnswerOption</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 20,
    borderColor: "#252525",
    borderRadius: 100,
  },
});
