import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Video as LucideIcon } from 'lucide-react-native';

interface DraggableShapeProps {
  id: string;
  color: string;
  name: string;
  icon: LucideIcon;
  initialPosition: { x: number; y: number };
  isMatched: boolean;
  onMatch: (shapeId: string) => void;
  isTargetPosition: (x: number, y: number, targetId: string) => boolean;
}

export default function DraggableShape({
  id,
  color,
  name,
  icon: IconComponent,
  initialPosition,
  isMatched,
  onMatch,
  isTargetPosition,
}: DraggableShapeProps) {
  const translateX = useSharedValue(initialPosition.x);
  const translateY = useSharedValue(initialPosition.y);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handleMatch = () => {
    onMatch(id);
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      if (isMatched) return;
      scale.value = withSpring(1.2);
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
        // Correct match - celebrate and stay in place
        scale.value = withSequence(
          withSpring(1.5),
          withSpring(1.2),
          withSpring(1)
        );
        opacity.value = withSequence(
          withTiming(0.7, { duration: 200 }),
          withTiming(1, { duration: 200 })
        );
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
    opacity: opacity.value,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          styles.shapeContainer,
          animatedStyle,
          { backgroundColor: color },
          isMatched && styles.matchedShape,
        ]}
      >
        <IconComponent 
          size={30} 
          color="#FFFFFF" 
          strokeWidth={2.5}
        />
        <Text style={styles.shapeName}>{name}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  shapeContainer: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  matchedShape: {
    shadowColor: '#FFD700',
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 12,
  },
  shapeName: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
    textAlign: 'center',
  },
});