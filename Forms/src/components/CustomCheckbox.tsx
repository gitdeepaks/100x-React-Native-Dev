import Checkbox from "expo-checkbox";
import { useController } from "react-hook-form";
import { View, Text, StyleSheet } from "react-native";

interface CustomCheckbox {
  name: string;
  label?: string;
}

export default function CustomCheckbox({ name, label }: CustomCheckbox) {
  const {
    field: { value, onChange },
  } = useController({ name });

  return (
    <View style={styles.container}>
      <Checkbox style={{}} value={value} onValueChange={onChange} />
      <Text style={{}}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginVertical: 5,
  },
});
