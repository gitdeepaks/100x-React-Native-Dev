import React, { forwardRef } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FormFieldProps } from '@/types/form';

export const FormField = forwardRef<TextInput, FormFieldProps>(({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  autoComplete = 'off',
  keyboardType = 'default',
  returnKeyType = 'next',
  onSubmitEditing,
  textContentType = 'none',
  blurOnSubmit = false,
  editable = true,
  maxLength,
}, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const getBorderColor = () => {
    if (error) return '#EF4444'; // Red for error
    if (isFocused) return '#3B82F6'; // Blue for focus
    if (value && value.length > 0 && !error) return '#10B981'; // Green for valid input
    return '#D1D5DB'; // Gray for default
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[
        styles.inputContainer,
        { borderColor: getBorderColor() }
      ]}>
        <TextInput
          ref={ref}
          style={[
            styles.input,
            { color: editable ? '#111827' : '#6B7280' }
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={secureTextEntry}
          autoComplete={autoComplete}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          textContentType={textContentType}
          blurOnSubmit={blurOnSubmit}
          editable={editable}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize="none"
          autoCorrect={false}
          accessible={true}
          accessibilityLabel={label}
          accessibilityHint={error ? `Error: ${error}` : undefined}
        />
      </View>
      {error && (
        <Text style={styles.errorText} accessible={true} accessibilityRole="alert">
          {error}
        </Text>
      )}
    </View>
  );
});

FormField.displayName = 'FormField';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  inputContainer: {
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    minHeight: 52,
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
});