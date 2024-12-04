import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useEffect,
} from "react";
import questions from "../questions";
import { Question } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface QuizProviderProps {
  question?: Question;
  questionIndex: number;
  onNext: () => void;
  selectedOption?: string;
  setSelectedOption: (newOption: string) => void;
  score: number;
  totalQuestions: number;
  bestScore: number;
}

export const QuizContext = createContext<QuizProviderProps>({
  questionIndex: 0,
  onNext: () => {},
  setSelectedOption: () => {},
  score: 0,
  totalQuestions: 0,
  bestScore: 0,
});

export const QuizProvider = ({ children }: PropsWithChildren) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions[questionIndex];

  const [selectedOption, setSelectedOption] = useState<string | undefined>();

  const [score, setScore] = useState(0);

  const [bestScore, setBestScore] = useState(0);

  const isFinished = questionIndex >= questions.length;

  useEffect(() => {
    loadBestScore();
  }, []);

  useEffect(() => {
    // console.log(isFinished === true && score > bestScore);

    // check if there is new best score
    if (isFinished === true && score > bestScore) {
      setBestScore(score);
      saveBestScore(score);
    }
  }, [isFinished]);

  const restart = () => {
    setQuestionIndex(0);
    setSelectedOption("");
    setScore(0);
  };

  const onNext = () => {
    if (isFinished) {
      restart();
      return;
    }
    // check if answer is correct

    if (selectedOption === question?.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setQuestionIndex((currVal) => currVal + 1);
  };

  const saveBestScore = async (value: number) => {
    try {
      await AsyncStorage.setItem("best-score", value.toString());
    } catch (error) {}
  };

  const loadBestScore = async () => {
    try {
      const value = await AsyncStorage.getItem("best-score");
      if (value !== null) {
        setBestScore(Number.parseInt(value));
      }
    } catch (error) {}
  };

  return (
    <QuizContext.Provider
      value={{
        question,
        questionIndex,
        onNext,
        selectedOption,
        setSelectedOption,
        score,
        totalQuestions: questions.length,
        bestScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);
