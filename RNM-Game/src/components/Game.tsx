import { ballRadius, boardHeight } from "@/constansts";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Button,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { BallData } from "@/types";

import Ball from "./Ball";
import { GameContext } from "@/GameContext";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function Game() {
  const { width } = useWindowDimensions();

  const ball = useSharedValue<BallData>({
    x: width / 2,
    y: boardHeight - ballRadius,
    r: ballRadius,
    dx: -1,
    dy: -1,
  });

  const isUserTurn = useSharedValue(true);

  const onEndTurn = () => {
    "worklet";
    if (isUserTurn.value) {
      return;
    }
    isUserTurn.value = true;
  };

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      if (!isUserTurn.value) {
        return;
      }
      const x = event.translationX;
      const y = event.translationY;
      const mag = Math.sqrt(x * x + y * y);
      ball.value = {
        ...ball.value,
        dx: -x / mag,
        dy: -y / mag,
      };
    })
    .onEnd(() => {
      if (ball.value.dy < 0) {
        isUserTurn.value = false;
      }
    });

  const pathStyle = useAnimatedStyle(() => {
    const { x, y, dx, dy } = ball!.value;
    const angle = Math.atan2(-dx, dy);
    return {
      display: isUserTurn!.value && dy < 0 ? "flex" : "none",
      top: y,
      left: x,
      transform: [
        {
          rotate: `${angle}rad`,
        },
      ],
    };
  });

  return (
    <GameContext.Provider value={{ ball, isUserTurn, onEndTurn }}>
      <GestureDetector gesture={pan}>
        <SafeAreaView style={styles.container}>
          <View style={styles.board}>
            {/* TODO: Add game elements */}

            <Ball />

            {/* Ball Trajectary */}

            <Animated.View
              style={[
                {
                  width: 0,
                  height: 1000,
                  position: "absolute",
                  borderRadius: 30,
                  borderStyle: "dotted",
                  borderWidth: 1,
                  borderColor: "#ffffff99",
                  transformOrigin: "top-center",
                },
                pathStyle,
              ]}
            />
          </View>
          <Button title="Move" onPress={() => (isUserTurn.value = false)} />
        </SafeAreaView>
      </GestureDetector>
    </GameContext.Provider>
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
