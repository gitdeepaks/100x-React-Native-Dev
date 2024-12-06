import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

export default function PaymentDetailsForm() {
  function onNext() {
    // validate from

    // redirect Next
    router.push("/checkout/confirm");
  }
  return (
    <View style={styles.container}>
      <Text>Payment Details</Text>

      <CustomButton onPress={onNext} title="Next" style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1, padding: 10 },
  button: { marginTop: "auto", marginBottom: 25 },
});
