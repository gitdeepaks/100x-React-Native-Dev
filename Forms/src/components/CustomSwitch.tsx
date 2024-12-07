import Checkbox from "expo-checkbox";
import { useController } from "react-hook-form";
import { View, Text, Switch, StyleSheet } from "react-native";

interface CustomSwitch {
  name: string;
  label?: string;
}

export default function CustomSwitch({ name, label }: CustomSwitch) {
  const {
    field: { value, onChange },
  } = useController({ name });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <Switch style={styles.switch} value={value} onValueChange={onChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    marginVertical: 5,
  },
  text: { fontSize: 16, fontWeight: "semibold" },
  switch: {
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
    margin: 0,
  },
});
