import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useHabits } from '@/contexts/HabitContext';
import { Trash2, Download, Upload, Info } from 'lucide-react-native';

export default function SettingsScreen() {
  const { habits, completions } = useHabits();

  const handleExportData = () => {
    const data = {
      habits,
      completions,
      exportDate: new Date().toISOString()
    };
    
    Alert.alert(
      'Export Data',
      `Your data has been prepared for export.\n\nHabits: ${habits.length}\nCompletions: ${completions.length}`,
      [{ text: 'OK' }]
    );
  };

  const handleImportData = () => {
    Alert.alert(
      'Import Data',
      'This feature allows you to import previously exported habit data.',
      [{ text: 'OK' }]
    );
  };

  const handleClearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your habits and progress. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete All', 
          style: 'destructive',
          onPress: () => {
            // In a real app, you would implement this functionality
            Alert.alert('Feature Coming Soon', 'This feature will be available in a future update.');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleExportData}>
            <View style={styles.settingIcon}>
              <Download size={20} color="#6366f1" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Export Data</Text>
              <Text style={styles.settingDescription}>
                Save your habits and progress data
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleImportData}>
            <View style={styles.settingIcon}>
              <Upload size={20} color="#10b981" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Import Data</Text>
              <Text style={styles.settingDescription}>
                Restore from previously exported data
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleClearAllData}>
            <View style={styles.settingIcon}>
              <Trash2 size={20} color="#ef4444" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Clear All Data</Text>
              <Text style={styles.settingDescription}>
                Delete all habits and progress
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{habits.length}</Text>
              <Text style={styles.statLabel}>Total Habits</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{completions.length}</Text>
              <Text style={styles.statLabel}>Total Completions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {habits.length > 0 ? Math.round((completions.filter(c => c.completed).length / completions.length) * 100) || 0 : 0}%
              </Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.aboutContainer}>
            <View style={styles.aboutIcon}>
              <Info size={24} color="#6366f1" />
            </View>
            <View style={styles.aboutContent}>
              <Text style={styles.aboutTitle}>Habit Tracker</Text>
              <Text style={styles.aboutVersion}>Version 1.0.0</Text>
              <Text style={styles.aboutDescription}>
                A beautiful and simple habit tracking app to help you build better habits and achieve your goals.
              </Text>
            </View>
          </View>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#334155',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 12,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#6366f1',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
    textAlign: 'center',
  },
  aboutContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  aboutIcon: {
    marginRight: 12,
    marginTop: 4,
  },
  aboutContent: {
    flex: 1,
  },
  aboutTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  aboutVersion: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6366f1',
    marginBottom: 8,
  },
  aboutDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 100,
  },
});