import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Platform } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { format } from 'date-fns';

interface DatePickerFieldProps {
  label: string;
  value: Date;
  onDateChange: (date: Date) => void;
  error?: string;
  placeholder?: string;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  value,
  onDateChange,
  error,
  placeholder = 'Select a date',
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateSelect = (date: Date) => {
    onDateChange(date);
    setShowDatePicker(false);
  };

  const getBorderColor = () => {
    if (error) return '#EF4444';
    if (value && value.getFullYear() !== 2000) return '#10B981'; // Show green if date changed from default
    return '#D1D5DB';
  };

  // Simple date picker for web/mobile
  const renderDatePicker = () => {
    if (Platform.OS === 'web') {
      return (
        <input
          type="date"
          value={format(value, 'yyyy-MM-dd')}
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            if (!isNaN(newDate.getTime())) {
              handleDateSelect(newDate);
            }
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0,
            cursor: 'pointer',
            width: '100%',
            height: '100%',
          }}
        />
      );
    }

    return (
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Date of Birth</Text>
            <View style={styles.datePickerContainer}>
              <Text style={styles.datePickerText}>
                Current: {format(value, 'dd/MM/yyyy')}
              </Text>
              <Text style={styles.datePickerNote}>
                In a production app, use @react-native-community/datetimepicker
              </Text>
              
              {/* Simple year selector for demo */}
              <View style={styles.yearSelector}>
                <TouchableOpacity
                  style={styles.yearButton}
                  onPress={() => {
                    const newDate = new Date(value);
                    newDate.setFullYear(1990);
                    handleDateSelect(newDate);
                  }}
                >
                  <Text style={styles.yearButtonText}>1990</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.yearButton}
                  onPress={() => {
                    const newDate = new Date(value);
                    newDate.setFullYear(1995);
                    handleDateSelect(newDate);
                  }}
                >
                  <Text style={styles.yearButtonText}>1995</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.yearButton}
                  onPress={() => {
                    const newDate = new Date(value);
                    newDate.setFullYear(2000);
                    handleDateSelect(newDate);
                  }}
                >
                  <Text style={styles.yearButtonText}>2000</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.confirmButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.dateButton, { borderColor: getBorderColor() }]}
        onPress={() => setShowDatePicker(true)}
        accessible={true}
        accessibilityLabel={label}
        accessibilityHint={error ? `Error: ${error}` : undefined}
        accessibilityRole="button"
      >
        <Text style={[styles.dateText, { color: value ? '#111827' : '#9CA3AF' }]}>
          {value ? format(value, 'dd/MM/yyyy') : placeholder}
        </Text>
        <Calendar size={20} color="#6B7280" />
        {Platform.OS === 'web' && renderDatePicker()}
      </TouchableOpacity>
      {error && (
        <Text style={styles.errorText} accessible={true} accessibilityRole="alert">
          {error}
        </Text>
      )}
      {Platform.OS !== 'web' && renderDatePicker()}
    </View>
  );
};

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
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    minHeight: 52,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    position: 'relative',
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
  },
  datePickerContainer: {
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  datePickerNote: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  yearSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  yearButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  yearButtonText: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Inter-Regular',
  },
  confirmButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});