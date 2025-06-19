import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SignupForm } from '@/components/SignupForm';

export default function SignupScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <SignupForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});