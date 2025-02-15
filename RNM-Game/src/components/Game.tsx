import { ballRadius, boardHeight } from "@/constansts";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Button,
  useWindowDimensions,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";

import { BallData } from "@/types";

import Ball from "./Ball";
import { GameContext } from "@/GameContext";

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

  return (
    <GameContext.Provider value={{ ball, isUserTurn }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.board}>
          {/* TODO: Add game elements */}

          <Ball />
        </View>
        <Button title="Move" onPress={() => (isUserTurn.value = false)} />
      </SafeAreaView>
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
