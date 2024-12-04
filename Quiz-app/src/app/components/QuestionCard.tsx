import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Card } from "./Card";
import { AnswerOption } from "./AnswerOption";
import { Question } from "../../types";

interface QuestionCard {
  question: Question;
}

export const QuestionCard = ({ question }: QuestionCard) => {
  const [counter, setCounter] = useState(0);

  console.log("Re-render");

  useEffect(() => {
    console.log("QuestionCard mounted");

    // cleanup function
    return () => {
      console.log("QuestionCard Unmounted");
    };
  }, []);

  useEffect(() => {
    console.log("QuestionCard changes");

    return () => {
      console.log("QuestionCard chnage : cleanup");
    };
  }, [question]);

  return (
    <Card title={question.title}>
      <Text
        style={{ fontSize: 40 }}
        onPress={() => setCounter((c) => c + 1)}
      ></Text>
      <View style={{ gap: 10 }}>
        {question.options.map((option) => (
          <AnswerOption key={option} option={option} />
        ))}
      </View>
    </Card>
  );
};
