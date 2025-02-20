import { StyleSheet, Text } from "react-native";
import React from "react";
import { blockW } from "@/constansts";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useGameContext } from "@/GameContext";

export default function Block({ index }: { index: number }) {
  const { blocks } = useGameContext();

  const [value, setValue] = React.useState(blocks?.value[index]?.val);

  useAnimatedReaction(
    () => blocks?.value[index].val,
    (val) => {
      if (val !== value) {
        runOnJS(setValue)(val);
      }
    }
  );

  const newStyles = useAnimatedStyle(() => {
    const block = blocks!.value[index];

    if (!block || block.val <= 0) {
      return {
        display: "none",
      };
    }
    const { w, x, y, val } = block;

    return {
      display: "flex",
      width: w,
      height: w,
      position: "absolute",
      top: withTiming(y),
      left: x,
      backgroundColor: "yellow",

      alignItems: "center",
      justifyContent: "center",
    };
  });
  return (
    <Animated.View style={[styles.block, newStyles]}>
      <Text style={{ fontSize: blockW / 2, color: "gray" }}>{value}</Text>
    </Animated.View>
  );
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
