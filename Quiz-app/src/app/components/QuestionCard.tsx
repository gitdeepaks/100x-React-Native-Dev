import React from "react";
import { View, Text } from "react-native";
import { Card } from "./Card";
import { AnswerOption } from "./AnswerOption";
import { Question } from "../../types";
import { useState } from "react";

interface QuestionCard {
  question: Question;
}

export const QuestionCard = ({ question }: QuestionCard) => {
  return (
    <Card title={question.title}>
      <View style={{ gap: 10 }}>
        {question.options.map((option) => (
          <AnswerOption key={option} option={option} />
        ))}
      </View>
    </Card>
  );
};
