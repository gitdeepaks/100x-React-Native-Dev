import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { SplashScreen } from 'expo-router';
import { FormField } from './FormField';
import { DatePickerField } from './DatePickerField';
import { CheckboxField } from './CheckboxField';
import { useSignupForm } from '@/hooks/useSignupForm';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export const SignupForm: React.FC = () => {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
  });

  const {
    formState,
    updateField,
    submitForm,
    resetForm,
    setFieldRef,
    focusNextField,
  } = useSignupForm();

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleSubmit = async () => {
    Keyboard.dismiss();
    await submitForm();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>SignUp</Text>
            <Text style={styles.subtitle}>Create your account to get started</Text>
          </View>

          <View style={styles.form}>
            <FormField
              ref={(ref) => setFieldRef('fullName', ref)}
              label="Full Name"
              value={formState.data.fullName}
              onChangeText={(text) => updateField('fullName', text)}
              placeholder="John Doe"
              autoComplete="name"
              textContentType="name"
              returnKeyType="next"
              onSubmitEditing={() => focusNextField('fullName')}
              error={formState.touched.fullName ? formState.errors.fullName : undefined}
              maxLength={50}
            />

            <FormField
              ref={(ref) => setFieldRef('email', ref)}
              label="Email"
              value={formState.data.email}
              onChangeText={(text) => updateField('email', text)}
              placeholder="john@gmail.com"
              keyboardType="email-address"
              autoComplete="email"
              textContentType="emailAddress"
              returnKeyType="next"
              onSubmitEditing={() => focusNextField('email')}
              error={formState.touched.email ? formState.errors.email : undefined}
              maxLength={100}
            />

            <FormField
              ref={(ref) => setFieldRef('password', ref)}
              label="Password"
              value={formState.data.password}
              onChangeText={(text) => updateField('password', text)}
              placeholder="Password"
              secureTextEntry
              autoComplete="new-password"
              textContentType="newPassword"
              returnKeyType="next"
              onSubmitEditing={() => focusNextField('password')}
              error={formState.touched.password ? formState.errors.password : undefined}
              maxLength={32}
            />

            <FormField
              ref={(ref) => setFieldRef('confirmPassword', ref)}
              label="Confirm Password"
              value={formState.data.confirmPassword}
              onChangeText={(text) => updateField('confirmPassword', text)}
              placeholder="Confirm Password"
              secureTextEntry
              autoComplete="new-password"
              textContentType="newPassword"
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
              error={formState.touched.confirmPassword ? formState.errors.confirmPassword : undefined}
              maxLength={32}
            />

            <DatePickerField
              label="Date of birth"
              value={formState.data.dateOfBirth}
              onDateChange={(date) => updateField('dateOfBirth', date)}
              placeholder="Select a date"
              error={formState.touched.dateOfBirth ? formState.errors.dateOfBirth : undefined}
            />

            <CheckboxField
              label="I accept the terms and privacy policy"
              value={formState.data.acceptTerms}
              onValueChange={(value) => updateField('acceptTerms', value)}
              error={formState.touched.acceptTerms ? formState.errors.acceptTerms : undefined}
            />

            <TouchableOpacity
              style={[
                styles.submitButton,
                { opacity: formState.isSubmitting ? 0.7 : 1 }
              ]}
              onPress={handleSubmit}
              disabled={formState.isSubmitting}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Sign up"
              accessibilityHint="Create your account"
            >
              {formState.isSubmitting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.submitButtonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetForm}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Reset form"
            >
              <Text style={styles.resetButtonText}>Reset Form</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  form: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    minHeight: 52,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  resetButton: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 12,
  },
  resetButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});