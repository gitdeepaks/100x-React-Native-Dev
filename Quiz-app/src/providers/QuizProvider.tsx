import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from "react";
import questions from "../questions";
import { Question } from "../types";

interface QuizProviderProps {
  question?: Question;
  questionIndex: number;
  onNext: () => void;
  selectedOption?: string;
  setSelectedOption: (newOption: string) => void;
  score: number;
  totalQuestions: number;
}

export const QuizContext = createContext<QuizProviderProps>({
  questionIndex: 0,
  onNext: () => {},
  setSelectedOption: () => {},
  score: 0,
  totalQuestions: 0,
});

export const QuizProvider = ({ children }: PropsWithChildren) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions[questionIndex];

  const [selectedOption, setSelectedOption] = useState<string | undefined>();

  const [score, setScore] = useState(0);

  const isFinished = questionIndex >= questions.length;

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
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);
