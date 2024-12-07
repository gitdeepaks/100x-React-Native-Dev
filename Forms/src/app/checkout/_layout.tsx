import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import CheckoutFormProvider from "../../contexts/CheckoutFormProvider";
import CheckoutFormStepIndicator from "../../components/CheckoutFormStepIndicator";

export default function CheckoutLayout() {
  return (
    <CheckoutFormProvider>
      <CheckoutFormStepIndicator />
      <Stack>
        <Stack.Screen name="personal" options={{ title: "Personal" }} />
        <Stack.Screen name="payment" options={{ title: "Payment" }} />
        <Stack.Screen name="confirm" options={{ title: "Confirm" }} />
      </Stack>
    </CheckoutFormProvider>
  );
}

const styles = StyleSheet.create({});
