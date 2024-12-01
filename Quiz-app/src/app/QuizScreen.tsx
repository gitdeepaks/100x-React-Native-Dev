import { StyleSheet, Text, View } from "react-native";
import { QuestionCard } from "./components/QuestionCard";

const QuizScreen = () => {
  return (
    <View
      style={{
        backgroundColor: "#fdfef4",
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <QuestionCard />
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({});
