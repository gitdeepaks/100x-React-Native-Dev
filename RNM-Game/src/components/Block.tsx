import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { blockW } from "@/constansts";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { BlockData } from "@/types";
import { useGameContext } from "@/GameContext";

export default function Block({ index }: { index: number }) {
  const { blocks } = useGameContext();
  const newStyles = useAnimatedStyle(() => {
    const block = blocks!.value[index];

    if (!block || block.val <= 0) {
      return {
        display: "none",
      };
    }
    const { w, x, y, val } = block;

    return {
      width: w,
      height: w,
      position: "absolute",
      top: y,
      left: x,
      backgroundColor: "yellow",
    };
  });
  return <Animated.View style={[styles.block, newStyles]} />;
}

const styles = StyleSheet.create({
  block: {
    width: blockW,
    height: blockW,
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "yellow",
  },
});
