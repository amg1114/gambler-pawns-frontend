import axios from '@/app/lib/_axios';
import { LoginForm, RegisterForm } from '@/app/auth/_interfaces';
import { LoginResponse } from '../interfaces/login-res.interface';



export const registerRequest = async (data: RegisterForm ) =>   axios.post('/auth/signup', data);
export const loginRequest = async (data: LoginForm) => axios.post<LoginResponse>('/auth/login', data);
export const logoutRequest = async () =>  axios.post('/auth/logout');