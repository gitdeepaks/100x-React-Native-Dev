import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useHabits } from '@/contexts/HabitContext';
import ProgressCard from '@/components/ProgressCard';
import HabitCard from '@/components/HabitCard';

export default function HomeScreen() {
  const { habits, getTodayProgress, toggleCompletion, isHabitCompleted } = useHabits();
  const today = new Date().toISOString().split('T')[0];
  const progress = getTodayProgress();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.time}>
            {new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false 
            })}
          </Text>
        </View>

        <ProgressCard
          completed={progress.completed}
          total={progress.total}
          percentage={progress.percentage}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Habits</Text>
          
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              isCompleted={isHabitCompleted(habit.id, today)}
              onToggle={() => toggleCompletion(habit.id, today, habit.target)}
            />
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  time: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  bottomSpacing: {
    height: 100,
  },
});