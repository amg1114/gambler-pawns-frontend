import { z } from "zod";

export const loginSchema = z.object({
  nickname: z
    .string()
    .min(3, { message: "Please enter a valid username" })
    .max(20, { message: "Please enter a valid username" }),
  password: z
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
    .refine((password) => /[!@#$%^&*(),.?]/.test(password), {
      message: "Please enter a valid password, at least one special character",
    }),
});

export const registerSchema = z
  .object({
    nickname: z
      .string()
      .min(3, { message: "Please enter a valid username" })
      .max(20, { message: "Please enter a valid username" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
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
      .refine((password) => /[!@#$%^&*(),.?]/.test(password), {
        message:
          "Please enter a valid password, at least one special character",
      }),
    confirmpassword: z
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
      .refine((password) => /[!@#$%^&*(),.?]/.test(password), {
        message:
          "Please enter a valid password, at least one special character",
      }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
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

export interface user {
  username: string;
  password: string;
  id: string;
}
