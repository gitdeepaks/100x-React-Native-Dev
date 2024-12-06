import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import CustomTextInput from "../../components/CustomTextInput";

export default function PersonalDetailsForm() {
  const [name, setName] = useState("");

  function onNext() {
    console.log("submit", name);

    // redirect Next
    router.push("/checkout/payment");
  }
  return (
    <View style={styles.container}>
      <CustomTextInput label="FullName" placeholder="FullName" />
      <CustomTextInput label="Address" placeholder="Address" />

      <View style={{ flexDirection: "row", gap: 10 }}>
        <CustomTextInput
          label="City"
          placeholder="City"
          containerStyle={{ flex: 1 }}
        />
        <CustomTextInput
          label="Postal Code"
          placeholder="1234"
          containerStyle={{ flex: 1 }}
        />
      </View>
      <CustomTextInput
        label="Phone Number"
        placeholder="123456789"
        inputMode="tel"
      />

      <CustomButton onPress={onNext} title="Next" style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1, padding: 10, gap: 10 },
  button: { marginTop: "auto", marginBottom: 25 },
});
