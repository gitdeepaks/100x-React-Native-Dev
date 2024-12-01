import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AnswerOption } from "./AnswerOption";

export const QuestionCard = () => {
  return (
    <View style={styles.questionCard}>
      <Text style={styles.question}>What is React Native ?</Text>
      <View style={{ gap: 10 }}>
        <AnswerOption />
        <AnswerOption />
        <AnswerOption />
        <AnswerOption />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  questionCard: {
    backgroundColor: "white",
    padding: 20,
    paddingVertical: 40,
    borderRadius: 20,
    gap: 20,

    // shadow

    shadowColor: "#252525",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
  },
  question: {
    fontSize: 24,
    fontWeight: "500",
  },
});
