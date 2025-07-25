import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useEffect } from 'react';

interface TargetHoleProps {
  color: string;
  position: { x: number; y: number };
  isMatched: boolean;
}

export default function TargetHole({ color, position, isMatched }: TargetHoleProps) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isMatched) {
      // Fill the hole when matched
      scale.value = withSpring(1.1, { damping: 12 });
    }
  }, [isMatched]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.targetHole,
        animatedStyle,
        {
          left: position.x,
          top: position.y,
          borderColor: color,
          backgroundColor: isMatched ? color : 'transparent',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  targetHole: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },
});