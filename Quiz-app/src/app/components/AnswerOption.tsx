import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

interface AnswerOptionProps {
  option: string;
  isSelected?: boolean;
  onPress: () => void;
}

export const AnswerOption = ({
  option,
  isSelected,
  onPress,
}: AnswerOptionProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        isSelected && {
          backgroundColor: "yellow",
          borderColor: "yellow",
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
