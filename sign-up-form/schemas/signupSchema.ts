import { z } from 'zod';
import { differenceInYears } from 'date-fns';

export const signupSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Full name must contain only letters and spaces')
    .transform((val) => val.trim()),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must not exceed 100 characters')
    .refine(
      (email) => {
        const domainPart = email.split('@')[1];
        return domainPart && domainPart.includes('.') && domainPart.length > 3;
      },
      { message: 'Please enter a valid email domain' }
    )
    .transform((val) => val.toLowerCase().trim()),
  
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must not exceed 32 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*]/, 'Password must contain at least one special character (!@#$%^&*)'),
  
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
  
  dateOfBirth: z
    .date({
      required_error: 'Date of birth is required',
      invalid_type_error: 'Please enter a valid date',
    })
    .refine(
      (date) => {
        const age = differenceInYears(new Date(), date);
        return age >= 18;
      },
      { message: 'You must be at least 18 years old to sign up' }
    )
    .refine(
      (date) => date <= new Date(),
      { message: 'Date of birth cannot be in the future' }
    ),
  
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must accept the terms and conditions to continue',
    }),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }
);

export type SignupFormSchema = z.infer<typeof signupSchema>;