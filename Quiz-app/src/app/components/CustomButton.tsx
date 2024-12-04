import {
  StyleSheet,
  Text,
  View,
  Pressable,
  PressableProps,
} from "react-native";
import React from "react";

interface CustomButtonProrps extends PressableProps {
  title: string;
  rightIcon?: React.ReactNode;
}

export const CustomButton = ({
  title,
  rightIcon,

  ...pressableProps
}: CustomButtonProrps) => {
  return (
    <Pressable {...pressableProps} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
      <View style={styles.rightIcon}>{rightIcon}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#005055",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  rightIcon: {
    position: "absolute",
    right: 20,
  },
});
