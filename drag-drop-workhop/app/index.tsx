import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DraggableCircle from '@/components/DraggableCircle';
import TargetHole from '@/components/TargetHole';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CIRCLES = [
  {
    id: 'red',
    color: '#FF4444',
    initialPosition: { x: 30, y: screenHeight * 0.25 },
  },
  {
    id: 'blue',
    color: '#4444FF',
    initialPosition: { x: 30, y: screenHeight * 0.65 },
  },
  {
    id: 'purple',
    color: '#AA44FF',
    initialPosition: { x: 30, y: screenHeight * 0.85 },
  },
  {
    id: 'teal',
    color: '#00AA88',
    initialPosition: { x: 30, y: screenHeight * 0.95 },
  },
  {
    id: 'yellow',
    color: '#FFAA00',
    initialPosition: { x: 30, y: screenHeight * 0.45 },
  },
];

const TARGETS = [
  {
    id: 'blue',
    color: '#4444FF',
    position: { x: screenWidth - 100, y: screenHeight * 0.15 },
  },
  {
    id: 'red',
    color: '#FF4444',
    position: { x: screenWidth - 100, y: screenHeight * 0.3 },
  },
  {
    id: 'teal',
    color: '#00AA88',
    position: { x: screenWidth - 150, y: screenHeight * 0.45 },
  },
  {
    id: 'purple',
    color: '#AA44FF',
    position: { x: 180, y: screenHeight * 0.75 },
  },
  {
    id: 'yellow',
    color: '#FFAA00',
    position: { x: screenWidth - 80, y: screenHeight * 0.75 },
  },
];

export default function CircleSortingGame() {
  const [matchedCircles, setMatchedCircles] = useState<string[]>([]);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleCircleMatch = (circleId: string) => {
    setMatchedCircles(prev => [...prev, circleId]);
  };

  const resetGame = () => {
    setMatchedCircles([]);
    setResetTrigger(prev => prev + 1);
  };

  const isTargetPosition = (x: number, y: number, targetId: string) => {
    const target = TARGETS.find(t => t.id === targetId);
    if (!target) return false;
    
    const distance = Math.sqrt(
      Math.pow(x - target.position.x, 2) + Math.pow(y - target.position.y, 2)
    );
    
    return distance < 50;
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.gameArea}>
        {/* Target Holes */}
        {TARGETS.map(target => (
          <TargetHole
            key={target.id}
            color={target.color}
            position={target.position}
            isMatched={matchedCircles.includes(target.id)}
          />
        ))}

        {/* Draggable Circles */}
        {CIRCLES.map(circle => (
          <DraggableCircle
            key={circle.id}
            id={circle.id}
            color={circle.color}
            initialPosition={circle.initialPosition}
            isMatched={matchedCircles.includes(circle.id)}
            onMatch={handleCircleMatch}
            isTargetPosition={isTargetPosition}
            resetTrigger={resetTrigger}
          />
        ))}

        {/* Instruction Text */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Drag and drop the shapes to the correct hole
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6D3',
  },
  gameArea: {
    flex: 1,
    position: 'relative',
  },
  instructionContainer: {
    position: 'absolute',
    top: screenHeight * 0.5,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 18,
    color: '#B8860B',
    textAlign: 'center',
    fontWeight: '500',
    maxWidth: 200,
  },
  resetButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    backgroundColor: '#4444FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});