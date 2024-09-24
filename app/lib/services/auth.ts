import axios from "@/app/lib/_axios";
import {
  ForgotPasswordForm,
  LoginForm,
  RegisterForm,
  ResetPasswordForm,
} from "@/app/lib/interfaces/auth.interface";
import { LoginResponse } from "../interfaces/responses/login-res.interface";

export const registerRequest = async (data: RegisterForm) =>
  axios.post("/auth/signup", data);

export const loginRequest = async (data: LoginForm) =>
  axios.post<LoginResponse>("/auth/login", data);

export const logoutRequest = async () => axios.post("/auth/logout");

export const sendForgotPasswordEmailRequest = async (
  data: ForgotPasswordForm,
) => axios.post("/auth/forgot-password", data);

export const resetPasswordRequest = async (data: ResetPasswordForm) => {
  const { confirmPassword, ...rest } = data;
  return axios.patch("/auth/reset-password", rest);
};
