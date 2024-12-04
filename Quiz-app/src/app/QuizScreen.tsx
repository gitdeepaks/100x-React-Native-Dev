import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  PressableProps,
  ActivityIndicator,
} from "react-native";
import { QuestionCard } from "./components/QuestionCard";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import questions from "../questions";
import { Card } from "./components/Card";
import { CustomButton } from "./components/CustomButton";
import { useState } from "react";
import { useQuizContext } from "../providers/QuizProvider";

const QuizScreen = () => {
  const { question, questionIndex, onNext, score, totalQuestions } =
    useQuizContext();

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View>
          <Text style={styles.title}>Question {questionIndex + 1}/5</Text>
        </View>
        {/* Body */}
        {question ? (
          <View>
            <QuestionCard question={question} />
            <Text style={styles.time}>20 Sec</Text>
          </View>
        ) : (
          <Card title="Well done">
            <Text>Greate Start</Text>
            <Text>
              You have done corrected answers {score}/{totalQuestions}
            </Text>
            <Text>Best Score is 10</Text>
          </Card>
        )}
        {/* Footer */}
        <CustomButton
          onPress={onNext}
          hitSlop={12}
          title="Next"
          rightIcon={
            <FontAwesome6 name="arrow-right-long" size={16} color="white" />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fdfef4",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    textAlign: "center",
    color: "#005055",
  },
  time: {
    textAlign: "center",
    marginTop: 10,
    color: "#005055",
    fontWeight: "bold",
  },
});
