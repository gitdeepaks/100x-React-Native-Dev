import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { QuestionCard } from "./components/QuestionCard";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import questions from "../questions";

const question = questions[0];

const QuizScreen = () => {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View>
          <Text style={styles.title}>Question 1/5</Text>
        </View>
        {/* Body */}
        <QuestionCard question={question} />
        <Text style={styles.time}>20 Sec</Text>

        {/* Footer */}
        <Pressable
          onPress={() => {
            console.warn("press");
          }}
          onLongPress={() => {
            console.warn("Long Press");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Next</Text>
          <FontAwesome6
            name="arrow-right-long"
            size={16}
            color="white"
            style={styles.buttonIcon}
          />
        </Pressable>
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
  button: {
    backgroundColor: "#005055",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  buttonIcon: {
    position: "absolute",
    right: 20,
  },
});
