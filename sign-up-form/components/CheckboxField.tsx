import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

interface CheckboxFieldProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  error?: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  value,
  onValueChange,
  error,
}) => {
  const handlePress = () => {
    onValueChange(!value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={handlePress}
        accessible={true}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: value }}
        accessibilityLabel={label}
        accessibilityHint={error ? `Error: ${error}` : undefined}
        activeOpacity={0.7}
      >
        <View style={[
          styles.checkbox,
          { 
            backgroundColor: value ? '#3B82F6' : 'transparent',
            borderColor: error ? '#EF4444' : (value ? '#3B82F6' : '#D1D5DB')
          }
        ]}>
          {value && (
            <Check size={16} color="white" strokeWidth={3} />
          )}
        </View>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
      {error && (
        <Text style={styles.errorText} accessible={true} accessibilityRole="alert">
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    flex: 1,
    fontFamily: 'Inter-Regular',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 32,
    fontFamily: 'Inter-Regular',
  },
});