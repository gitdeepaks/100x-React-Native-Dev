import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { QuestionCard } from "./components/QuestionCard";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Card } from "./components/Card";
import { CustomButton } from "./components/CustomButton";
import { useEffect, useState, useRef } from "react";
import { useQuizContext } from "../providers/QuizProvider";
import { useTimer } from "../hooks/use-timer";
import LottieView from "lottie-react-native";

const QuizScreen = () => {
  const { question, questionIndex, onNext, score, totalQuestions, bestScore } =
    useQuizContext();

  const { time, startTimer, clearTimer } = useTimer(50);

  useEffect(() => {
    // startTimer();

    return () => {
      clearTimer();
    };
  }, [question]);

  useEffect(() => {
    if (time <= 0) {
      onNext();
    }
  }, [time]);

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
            <Text style={styles.time}>{time} Sec</Text>
          </View>
        ) : (
          <>
            <LottieView
              style={StyleSheet.absoluteFill}
              autoPlay
              loop={false}
              source={require("../../assets/Animation - 1733314583154.json")}
            />
            <Card title="Well done">
              <Text>Greate Start</Text>
              <Text>
                You have done corrected answers {score}/{totalQuestions}
              </Text>
              <Text>Best Score is {bestScore}</Text>
            </Card>
          </>
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
    backgroundColor: "#fffff7",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    textAlign: "center",
    color: "#005057",
  },
  time: {
    textAlign: "center",
    marginTop: 10,
    color: "#005057",
    fontWeight: "bold",
  },
});
