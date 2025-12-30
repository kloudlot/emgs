import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Please enter a valid email address"),
  occupation: z.string().min(1, "Occupation is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  repeatPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.repeatPassword, {
  message: "Passwords do not match",
  path: ["repeatPassword"],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const updatePasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;

