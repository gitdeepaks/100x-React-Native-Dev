import React, { ComponentProps } from "react";
import { useController } from "react-hook-form";
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
  name: string;
}

export default function CustomTextInput({
  label,
  containerStyle,
  name,
  ...textInputProps
}: CustomTextInputProps) {
  const {
    field: { onChange, onBlur, value },
    fieldState,
  } = useController({ name });

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...textInputProps}
        value={value}
        onBlur={onBlur}
        onChangeText={onChange}
        style={[
          styles.input,
          textInputProps.style,
          fieldState.error ? styles.errorInput : {},
        ]}
      />
      <Text style={styles.error} numberOfLines={1}>
        {fieldState.error?.message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#B3D8FF",
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
    color: "#339CFF:",
  },
});
