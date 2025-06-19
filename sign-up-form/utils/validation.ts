import { signupSchema } from '@/schemas/signupSchema';
import { SignupFormData } from '@/types/form';

export const validateField = async (
  fieldName: keyof SignupFormData,
  value: any,
  allData: SignupFormData
): Promise<string | null> => {
  try {
    // For confirmPassword, we need to validate against the full schema
    // to check if it matches the password
    if (fieldName === 'confirmPassword') {
      await signupSchema.parseAsync(allData);
      return null;
    }
    
    // For other fields, validate just that field
    const fieldSchema = signupSchema.shape[fieldName];
    if (fieldSchema) {
      await fieldSchema.parseAsync(value);
      return null;
    }
    
    return null;
  } catch (error: any) {
    if (error.errors && error.errors.length > 0) {
      return error.errors[0].message;
    }
    return 'Invalid input';
  }
};

export const validateForm = async (data: SignupFormData): Promise<{
  isValid: boolean;
  errors: Partial<Record<keyof SignupFormData, string>>;
}> => {
  try {
    await signupSchema.parseAsync(data);
    return { isValid: true, errors: {} };
  } catch (error: any) {
    const errors: Partial<Record<keyof SignupFormData, string>> = {};
    
    if (error.errors) {
      error.errors.forEach((err: any) => {
        const field = err.path[0] as keyof SignupFormData;
        if (field && !errors[field]) {
          errors[field] = err.message;
        }
      });
    }
    
    return { isValid: false, errors };
  }
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};