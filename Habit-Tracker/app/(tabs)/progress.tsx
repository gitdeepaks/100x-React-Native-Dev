import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useHabits } from '@/contexts/HabitContext';
import { Calendar, TrendingUp, Target } from 'lucide-react-native';

export default function ProgressScreen() {
  const { habits, completions } = useHabits();

  const getWeeklyProgress = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      weekDays.push(date.toISOString().split('T')[0]);
    }

    return weekDays.map(date => {
      const dayCompletions = completions.filter(c => c.date === date && c.completed);
      return {
        date,
        completed: dayCompletions.length,
        total: habits.length,
        percentage: habits.length > 0 ? (dayCompletions.length / habits.length) * 100 : 0
      };
    });
  };

  const weeklyData = getWeeklyProgress();
  const weeklyAverage = weeklyData.reduce((sum, day) => sum + day.percentage, 0) / 7;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Progress</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Target size={24} color="#6366f1" />
            </View>
            <Text style={styles.statValue}>{habits.length}</Text>
            <Text style={styles.statLabel}>Active Habits</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <TrendingUp size={24} color="#10b981" />
            </View>
            <Text style={styles.statValue}>{Math.round(weeklyAverage)}%</Text>
            <Text style={styles.statLabel}>Weekly Average</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Calendar size={24} color="#f59e0b" />
            </View>
            <Text style={styles.statValue}>
              {weeklyData.filter(d => d.percentage === 100).length}
            </Text>
            <Text style={styles.statLabel}>Perfect Days</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <View style={styles.weekContainer}>
            {weeklyData.map((day, index) => {
              const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' });
              return (
                <View key={day.date} style={styles.dayContainer}>
                  <Text style={styles.dayName}>{dayName}</Text>
                  <View style={styles.dayProgressContainer}>
                    <View
                      style={[
                        styles.dayProgress,
                        { height: `${Math.max(day.percentage, 10)}%` },
                        day.percentage === 100 && styles.perfectDay
                      ]}
                    />
                  </View>
                  <Text style={styles.dayPercentage}>{Math.round(day.percentage)}%</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habit Details</Text>
          {habits.map(habit => {
            const habitCompletions = completions.filter(c => c.habitId === habit.id && c.completed);
            const completionRate = completions.filter(c => c.habitId === habit.id).length > 0 
              ? (habitCompletions.length / completions.filter(c => c.habitId === habit.id).length) * 100 
              : 0;

            return (
              <View key={habit.id} style={styles.habitDetailCard}>
                <View style={styles.habitDetailHeader}>
                  <View style={[styles.habitIcon, { backgroundColor: habit.color + '20' }]}>
                    <Text style={styles.habitIconText}>{habit.icon}</Text>
                  </View>
                  <View style={styles.habitDetailInfo}>
                    <Text style={styles.habitDetailName}>{habit.name}</Text>
                    <Text style={styles.habitDetailDescription}>{habit.description}</Text>
                  </View>
                  <Text style={styles.habitDetailRate}>{Math.round(completionRate)}%</Text>
                </View>
                <View style={styles.habitProgressBar}>
                  <View
                    style={[
                      styles.habitProgressFill,
                      { width: `${completionRate}%`, backgroundColor: habit.color }
                    ]}
                  />
                </View>
              </View>
            );
          })}
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
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
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
  weekContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dayName: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
    marginBottom: 8,
  },
  dayProgressContainer: {
    height: 80,
    width: 24,
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  dayProgress: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    width: '100%',
  },
  perfectDay: {
    backgroundColor: '#10b981',
  },
  dayPercentage: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
  },
  habitDetailCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  habitDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  habitIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  habitIconText: {
    fontSize: 16,
  },
  habitDetailInfo: {
    flex: 1,
  },
  habitDetailName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 2,
  },
  habitDetailDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
  },
  habitDetailRate: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
  },
  habitProgressBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
  },
  habitProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  bottomSpacing: {
    height: 100,
  },
});