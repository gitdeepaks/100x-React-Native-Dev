import { useState, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { SignupFormData, FormState } from '@/types/form';
import { validateField, validateForm, debounce } from '@/utils/validation';

const initialFormData: SignupFormData = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  dateOfBirth: new Date('2000-01-01'),
  acceptTerms: false,
};

const initialFormState: FormState = {
  data: initialFormData,
  errors: {},
  isSubmitting: false,
  isValid: false,
  touched: {},
};

export const useSignupForm = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const fieldRefs = useRef<Record<string, any>>({});

  const debouncedValidation = useCallback(
    debounce(async (fieldName: keyof SignupFormData, value: any, allData: SignupFormData) => {
      const error = await validateField(fieldName, value, allData);
      setFormState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          [fieldName]: error,
        },
      }));
    }, 300),
    []
  );

  const updateField = useCallback((field: keyof SignupFormData, value: any) => {
    setFormState(prev => {
      const newData = { ...prev.data, [field]: value };
      const newState = {
        ...prev,
        data: newData,
        touched: { ...prev.touched, [field]: true },
        errors: { ...prev.errors, [field]: undefined }, // Clear error immediately
      };

      // Trigger debounced validation
      debouncedValidation(field, value, newData);

      return newState;
    });
  }, [debouncedValidation]);

  const setFieldRef = useCallback((field: string, ref: any) => {
    if (ref) {
      fieldRefs.current[field] = ref;
    }
  }, []);

  const focusNextField = useCallback((currentField: string) => {
    const fieldOrder = ['fullName', 'email', 'password', 'confirmPassword'];
    const currentIndex = fieldOrder.indexOf(currentField);
    const nextField = fieldOrder[currentIndex + 1];
    
    if (nextField && fieldRefs.current[nextField]) {
      setTimeout(() => {
        fieldRefs.current[nextField].focus();
      }, 100);
    }
  }, []);

  const validateAllFields = useCallback(async () => {
    const { isValid, errors } = await validateForm(formState.data);
    
    setFormState(prev => ({
      ...prev,
      errors,
      isValid,
      touched: {
        fullName: true,
        email: true,
        password: true,
        confirmPassword: true,
        dateOfBirth: true,
        acceptTerms: true,
      },
    }));

    return isValid;
  }, [formState.data]);

  const submitForm = useCallback(async () => {
    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      const isValid = await validateAllFields();
      
      if (!isValid) {
        Alert.alert('Validation Error', 'Please fix the errors in the form before submitting.');
        return false;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted successfully:', formState.data);
      
      Alert.alert(
        'Success!',
        'Your account has been created successfully.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setFormState({
                ...initialFormState,
                data: { ...initialFormData }
              });
            },
          },
        ]
      );

      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      Alert.alert(
        'Error',
        'An error occurred while creating your account. Please try again.'
      );
      return false;
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  }, [formState.data, validateAllFields]);

  const resetForm = useCallback(() => {
    setFormState({
      ...initialFormState,
      data: { ...initialFormData }
    });
  }, []);

  return {
    formState,
    updateField,
    submitForm,
    resetForm,
    setFieldRef,
    focusNextField,
  };
};