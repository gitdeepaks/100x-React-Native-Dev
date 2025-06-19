import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay } from 'react-native-reanimated';
import { useEffect } from 'react';

interface ProgressCardProps {
  completed: number;
  total: number;
  percentage: number;
}

export default function ProgressCard({ completed, total, percentage }: ProgressCardProps) {
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    progressWidth.value = withDelay(300, withSpring(percentage));
  }, [percentage]);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning!';
    if (hour < 17) return 'Good afternoon!';
    return 'Good evening!';
  };

  const getMotivationalMessage = () => {
    if (percentage === 100) return 'Perfect day! 🎉';
    if (percentage >= 75) return 'You are almost there!';
    if (percentage >= 50) return 'Great progress!';
    if (percentage > 0) return 'Keep it up!';
    return 'Let\'s get started!';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{getGreeting()}</Text>
      
      <View style={styles.progressContainer}>
        <Text style={styles.motivationText}>{getMotivationalMessage()}</Text>
        <Text style={styles.progressText}>
          {completed}/{total} habits completed
        </Text>
        
        <View style={styles.progressBarContainer}>
          <Animated.View style={[styles.progressBar, animatedProgressStyle]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  progressContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
  },
  motivationText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#334155',
    marginBottom: 4,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
    marginBottom: 12,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
});