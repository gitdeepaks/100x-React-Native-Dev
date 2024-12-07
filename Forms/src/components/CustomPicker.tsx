import { StyleSheet, Text, View } from "react-native";
import React, { ComponentProps } from "react";
import RNPickerSelect from "react-native-picker-select";
import { useController } from "react-hook-form";

interface CustomPickerProps
  extends Omit<ComponentProps<typeof RNPickerSelect>, "onValueChange"> {
  name: string;
}

export default function CustomPicker({
  name,
  ...pickerProps
}: CustomPickerProps) {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useController({ name });

  return (
    <View style={{ marginVertical: 10 }}>
      <RNPickerSelect
        {...pickerProps}
        onValueChange={onChange}
        value={value}
        onClose={onBlur}
        style={{
          viewContainer: {
            marginTop: 4,
            marginBottom: 10,
          },
          inputIOS: {
            borderColor: error ? "crimson" : "#B3D8FF",
            borderWidth: 1,
            width: "100%",
            padding: 10,
            borderRadius: 5,
            pointerEvents: "none",
          },
        }}
      />
      <Text style={styles.error}>{error?.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "crimson",
    height: 17,
  },
});
