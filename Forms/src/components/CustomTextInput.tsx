import React, { ComponentProps } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StyleProp,
  ViewStyle,
} from "react-native";

interface CustomTextInputProps extends ComponentProps<typeof TextInput> {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function CustomTextInput({
  label,
  containerStyle,
  ...textInputProps
}: CustomTextInputProps) {
  const error = undefined;
  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...textInputProps}
        style={[
          styles.input,
          textInputProps.style,
          error ? styles.errorInput : {},
        ]}
      />
      <Text style={styles.error} numberOfLines={1}>
        {error}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "gainsboro",
    borderWidth: 1,
    width: "100%",
    padding: 10,
    borderRadius: 5,

    marginTop: 4,
    marginBottom: 2,
  },
  errorInput: {
    borderColor: "crimson",
  },
  error: {
    color: "crimson",
    height: 17,
  },
  label: {
    fontWeight: "600",
    color: "dimgray",
  },
});
