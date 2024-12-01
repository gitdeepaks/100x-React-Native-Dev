import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import QuizScreen from "./src/app/QuizScreen";

export default function App() {
  return (
    <>
      <QuizScreen />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
