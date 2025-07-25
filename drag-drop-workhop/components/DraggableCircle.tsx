import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface DraggableCircleProps {
  id: string;
  color: string;
  initialPosition: { x: number; y: number };
  isMatched: boolean;
  onMatch: (circleId: string) => void;
  isTargetPosition: (x: number, y: number, targetId: string) => boolean;
  resetTrigger: number;
}

export default function DraggableCircle({
  id,
  color,
  initialPosition,
  isMatched,
  onMatch,
  isTargetPosition,
  resetTrigger,
}: DraggableCircleProps) {
  const translateX = useSharedValue(initialPosition.x);
  const translateY = useSharedValue(initialPosition.y);
  const scale = useSharedValue(1);

  const handleMatch = () => {
    onMatch(id);
  };

  // Reset position when resetTrigger changes
  useEffect(() => {
    if (resetTrigger > 0) {
      translateX.value = withSpring(initialPosition.x);
      translateY.value = withSpring(initialPosition.y);
      scale.value = withSpring(1);
    }
  }, [resetTrigger, initialPosition.x, initialPosition.y]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      if (isMatched) return;
      scale.value = withSpring(1.1);
    })
    .onUpdate((event) => {
      if (isMatched) return;
      translateX.value = initialPosition.x + event.translationX;
      translateY.value = initialPosition.y + event.translationY;
    })
    .onEnd(() => {
      if (isMatched) return;
      
      const finalX = translateX.value;
      const finalY = translateY.value;
      
      scale.value = withSpring(1);
      
      if (isTargetPosition(finalX, finalY, id)) {
        // Correct match - stay in place
        runOnJS(handleMatch)();
      } else {
        // Wrong position - snap back
        translateX.value = withSpring(initialPosition.x, {
          damping: 15,
          stiffness: 150,
        });
        translateY.value = withSpring(initialPosition.y, {
          damping: 15,
          stiffness: 150,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  if (isMatched) {
    return null; // Hide matched circles
  }

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          styles.circle,
          animatedStyle,
          { backgroundColor: color },
        ]}
      />
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});