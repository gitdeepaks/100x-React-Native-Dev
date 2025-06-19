import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useHabits } from '@/contexts/HabitContext';
import { router } from 'expo-router';

const HABIT_ICONS = ['💧', '🏃', '📚', '🧘', '🥗', '💤', '🎯', '🎨', '🎵', '🌱'];
const HABIT_COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#f97316', '#84cc16'];

export default function AddScreen() {
  const { addHabit } = useHabits();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: HABIT_ICONS[0],
    color: HABIT_COLORS[0],
    target: 1,
    unit: '',
    frequency: 'daily' as 'daily' | 'weekly'
  });

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter a habit name');
      return;
    }

    if (!formData.unit.trim()) {
      Alert.alert('Error', 'Please enter a unit');
      return;
    }

    const description = `${formData.target} ${formData.unit}`;
    
    addHabit({
      name: formData.name,
      description,
      icon: formData.icon,
      color: formData.color,
      target: formData.target,
      unit: formData.unit,
      frequency: formData.frequency
    });

    // Reset form
    setFormData({
      name: '',
      description: '',
      icon: HABIT_ICONS[0],
      color: HABIT_COLORS[0],
      target: 1,
      unit: '',
      frequency: 'daily'
    });

    Alert.alert('Success', 'Habit added successfully!', [
      { text: 'OK', onPress: () => router.push('/(tabs)') }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Add New Habit</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.section}>
            <Text style={styles.label}>Habit Name</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
              placeholder="Enter habit name"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Target & Unit</Text>
            <View style={styles.targetContainer}>
              <TextInput
                style={[styles.input, styles.targetInput]}
                value={formData.target.toString()}
                onChangeText={(text) => setFormData(prev => ({ ...prev, target: parseInt(text) || 1 }))}
                placeholder="1"
                keyboardType="numeric"
                placeholderTextColor="#94a3b8"
              />
              <TextInput
                style={[styles.input, styles.unitInput]}
                value={formData.unit}
                onChangeText={(text) => setFormData(prev => ({ ...prev, unit: text }))}
                placeholder="liters, minutes, pages..."
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Choose Icon</Text>
            <View style={styles.iconGrid}>
              {HABIT_ICONS.map((icon) => (
                <TouchableOpacity
                  key={icon}
                  style={[
                    styles.iconOption,
                    formData.icon === icon && styles.selectedIcon
                  ]}
                  onPress={() => setFormData(prev => ({ ...prev, icon }))}
                >
                  <Text style={styles.iconText}>{icon}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Choose Color</Text>
            <View style={styles.colorGrid}>
              {HABIT_COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    formData.color === color && styles.selectedColor
                  ]}
                  onPress={() => setFormData(prev => ({ ...prev, color }))}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Frequency</Text>
            <View style={styles.frequencyContainer}>
              <TouchableOpacity
                style={[
                  styles.frequencyOption,
                  formData.frequency === 'daily' && styles.selectedFrequency
                ]}
                onPress={() => setFormData(prev => ({ ...prev, frequency: 'daily' }))}
              >
                <Text style={[
                  styles.frequencyText,
                  formData.frequency === 'daily' && styles.selectedFrequencyText
                ]}>
                  Daily
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.frequencyOption,
                  formData.frequency === 'weekly' && styles.selectedFrequency
                ]}
                onPress={() => setFormData(prev => ({ ...prev, frequency: 'weekly' }))}
              >
                <Text style={[
                  styles.frequencyText,
                  formData.frequency === 'weekly' && styles.selectedFrequencyText
                ]}>
                  Weekly
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: formData.color }]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Add Habit</Text>
          </TouchableOpacity>
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
  form: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  targetContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  targetInput: {
    flex: 1,
  },
  unitInput: {
    flex: 2,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  iconOption: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  selectedIcon: {
    borderColor: '#6366f1',
    backgroundColor: '#f0f9ff',
  },
  iconText: {
    fontSize: 20,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#1e293b',
  },
  frequencyContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  frequencyOption: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedFrequency: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  frequencyText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#64748b',
  },
  selectedFrequencyText: {
    color: '#ffffff',
  },
  submitButton: {
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  bottomSpacing: {
    height: 100,
  },
});