import { boardHeight } from "@/constansts";
import { SafeAreaView, View, StyleSheet, Button } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDecay,
  Easing,
  withSequence,
  withRepeat,
  withDelay,
} from "react-native-reanimated";

export default function Game() {
  const x = useSharedValue(1);
  const moveBall = () => {
    // x.value = withTiming(x.value + 100, {
    //   duration: 1000,
    //   easing: Easing.linear,
    // });

    x.value = withRepeat(
      withDelay(
        1000,
        withSequence(
          withTiming(230),
          withTiming(170),
          withTiming(200, {}, () => {})
        )
      ),
      -1
    );
  };

  const ballStyles = useAnimatedStyle(() => {
    return {
      left: x.value,
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.board}>
        {/* TODO: Add game elements */}

        <Animated.View
          style={[
            {
              width: 50,
              height: 50,
              backgroundColor: "white",
              borderRadius: 50,
              position: "absolute",
              top: boardHeight / 2,
              left: x,
            },
            ballStyles,
          ]}
        />
      </View>
      <Button title="Move" onPress={moveBall} />
    </SafeAreaView>
  );
  ``;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292929",
  },
  board: {
    backgroundColor: "#202020",
    height: boardHeight,
    marginVertical: "auto",
    overflow: "hidden",
  },
});
