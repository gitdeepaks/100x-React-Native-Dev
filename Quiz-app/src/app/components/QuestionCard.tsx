import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AnswerOption } from "./AnswerOption";
import { Question } from "../../types";

interface QuestionCard {
  question: Question;
}

export const QuestionCard = ({ question }: QuestionCard) => {
  const selectedOption = question.options[0];

  const onOptionSelected = (option: string) => {
    console.warn("Selected", option);
  };

  return (
    <View style={styles.questionCard}>
      <Text style={styles.question}>{question.title}</Text>
      <View style={{ gap: 10 }}>
        {question.options.map((option) => (
          <AnswerOption
            key={option}
            option={option}
            isSelected={option === selectedOption}
            onPress={() => onOptionSelected(option)}
          />
        ))}

        {/* <AnswerOption
          option={}
          isSelected={question.options[0] === selectedOption}
          onPress={() => onOptionSelected(question.options[0])}
        /> */}
        {/* <AnswerOption
          option={question.options[1]}
          isSelected={question.options[1] === selectedOption}
          onPress={() => onOptionSelected(question.options[1])}
        />
        <AnswerOption
          option={question.options[2]}
          isSelected={question.options[2] === selectedOption}
          onPress={() => onOptionSelected(question.options[2])}
        />
        <AnswerOption
          option={question.options[3]}
          isSelected={question.options[3] === selectedOption}
          onPress={() => onOptionSelected(question.options[3])}
        /> */}
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
