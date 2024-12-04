import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useQuizContext } from "../../providers/QuizProvider";

interface AnswerOptionProps {
  option: string;
}

export const AnswerOption = ({ option }: AnswerOptionProps) => {
  const { selectedOption, setSelectedOption } = useQuizContext();

  const isSelected = option === selectedOption;
  console.log("AnswerOption render");

  return (
    <Pressable
      onPress={() => setSelectedOption(option)}
      style={[
        styles.container,
        isSelected && {
          backgroundColor: "#ffff34",
          borderColor: "#ffff32",
        },
      ]}
    >
      <Text>{option}</Text>
    </Pressable>
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
