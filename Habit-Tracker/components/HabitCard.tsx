import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Habit } from '@/contexts/HabitContext';

interface HabitCardProps {
  habit: Habit;
  isCompleted: boolean;
  onToggle: () => void;
}

export default function HabitCard({ habit, isCompleted, onToggle }: HabitCardProps) {
  const scale = useSharedValue(1);
  const checkboxScale = useSharedValue(isCompleted ? 1 : 0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const checkboxAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkboxScale.value }],
  }));

  React.useEffect(() => {
    checkboxScale.value = withSpring(isCompleted ? 1 : 0);
  }, [isCompleted]);

  const handlePress = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    onToggle();
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity
        style={styles.content}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.leftContent}>
          <View style={[styles.iconContainer, { backgroundColor: habit.color + '20' }]}>
            <Text style={styles.icon}>{habit.icon}</Text>
          </View>
          
          <View style={styles.textContainer}>
            <Text style={[styles.habitName, isCompleted && styles.completedText]}>
              {habit.name}
            </Text>
            <Text style={styles.habitDescription}>{habit.description}</Text>
          </View>
        </View>

        <View style={[
          styles.checkbox,
          { borderColor: habit.color },
          isCompleted && { backgroundColor: habit.color }
        ]}>
          <Animated.View style={checkboxAnimatedStyle}>
            {isCompleted && <Check size={16} color="white" strokeWidth={3} />}
          </Animated.View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 2,
  },
  completedText: {
    color: '#64748b',
  },
  habitDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});