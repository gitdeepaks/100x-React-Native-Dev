export interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: Date;
  acceptTerms: boolean;
}

export interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  autoComplete?: 'name' | 'email' | 'password' | 'new-password' | 'off';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  returnKeyType?: 'done' | 'next' | 'send' | 'go';
  onSubmitEditing?: () => void;
  textContentType?: 'name' | 'emailAddress' | 'password' | 'newPassword' | 'none';
  blurOnSubmit?: boolean;
  editable?: boolean;
  maxLength?: number;
}

export interface ValidationError {
  field: keyof SignupFormData;
  message: string;
}

export interface FormState {
  data: SignupFormData;
  errors: Partial<Record<keyof SignupFormData, string>>;
  isSubmitting: boolean;
  isValid: boolean;
  touched: Partial<Record<keyof SignupFormData, boolean>>;
}