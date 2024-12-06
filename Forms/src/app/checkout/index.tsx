import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

export default function InitialChekoutFlow() {
  return <Redirect href={"/checkout/personal"} />;
}

const styles = StyleSheet.create({});
