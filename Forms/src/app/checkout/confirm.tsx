import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

export default function ConfirmForm() {
  function onNext() {
    // validate from

    // submit the data

    // redirect Next
    router.dismissAll();
    router.back();
    // router.push("/");
  }
  return (
    <View style={styles.container}>
      <Text>Confirm Form Submission</Text>

      <CustomButton onPress={onNext} title="Submit" style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1, padding: 10 },
  button: { marginTop: "auto", marginBottom: 25 },
});
