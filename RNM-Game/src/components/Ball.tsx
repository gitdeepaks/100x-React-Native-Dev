import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useFrameCallback,
} from "react-native-reanimated";
import { ballSpeed, boardHeight } from "@/constansts";
import { useGameContext } from "@/GameContext";

export default function Ball() {
  const { ball, isUserTurn, onEndTurn } = useGameContext();
  const { width } = useWindowDimensions();
  const frameCallback = useFrameCallback((frameInfo) => {
    // console.log(frameInfo);
    const delta = (frameInfo.timeSinceFirstFrame || 0) / 1000;
    let { x, y, dx, dy, r } = ball!.value;

    x += dx * delta * ballSpeed;

    y += dy * delta * ballSpeed;

    if (y < r) {
      // console.log("top collision");
      dy *= -1;
      y = r;
    }
    if (x < r) {
      // console.log("left collision");
      dx *= -1;
      x = r;
    }
    if (x > width - r) {
      // console.log("right collision");
      dx *= -1;
      x = width - r;
    }

    if (y > boardHeight - r) {
      // console.log("bottom collision");
      dy *= -1;
      y = boardHeight - r;
      onEndTurn();
    }

    ball!.value = { ...ball!.value, x, y, dx, dy };
  }, false);

  const startFrameCallback = (val: boolean) => {
    frameCallback.setActive(val);
  };

  useAnimatedReaction(
    () => isUserTurn!.value,
    (val) => runOnJS(startFrameCallback)(!val)
  );

  const ballStyles = useAnimatedStyle(() => {
    const { x, y, r } = ball!.value;

    return {
      left: x - r,
      top: y - r,
      width: r * 2,
      aspectRatio: 1,
      backgroundColor: "blue",
      borderRadius: r,
      position: "absolute" as const,
    };
  });
  return <Animated.View style={ballStyles} />;
}

const styles = StyleSheet.create({});
