import { z } from "zod";

const passwordField = z
  .string()
  .min(8, {
    message: "Please enter a valid password, more than 8 characters",
  })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Please enter a valid password, at least one uppercase letter",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Please enter a valid password, at least one lowercase letter",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Please enter a valid password, at least one number",
  })
  .refine(
    (password) =>
      /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/.test(password),
    {
      message: "Please enter a valid password, at least one special character",
    },
  );

const nicknameField = z
  .string()
  .min(3, { message: "Please enter a valid username" })
  .max(20, { message: "Please enter a valid username" });

export const loginSchema = z.object({
  nickname: nicknameField,
  password: passwordField,
});

export const registerSchema = z
  .object({
    nickname: nicknameField,
    email: z.string().email({ message: "Please enter a valid email" }),
    password: passwordField,
    confirmpassword: passwordField,
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});

export const resetPasswordSchema = z
  .object({
    newPassword: passwordField,
    confirmPassword: passwordField,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const updatePasswordSchema = z.object({
  currentPassword: passwordField.optional(),
  newPassword: passwordField.optional(),
});

export interface RegisterForm {
  nickname: string;
  email: string;
  password: string;
  confirmpassword: string;
  countryCode: string;
}

export interface LoginForm {
  nickname: string;
  password: string;
}

export interface ForgotPasswordForm {
  email: string;
}

export interface ResetPasswordForm {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface user {
  username: string;
  password: string;
  id: string;
}
