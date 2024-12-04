import React from "react";
import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Card {
  title: string;
  children?: React.ReactNode;
}

export const Card = ({ title, children }: PropsWithChildren<Card>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    paddingVertical: 40,
    borderRadius: 20,
    gap: 20,

    // shadow

    shadowColor: "#252525",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
});
