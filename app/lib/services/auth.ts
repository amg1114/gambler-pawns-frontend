import axios from '@/app/lib/_axios';
import { LoginResponse } from '../interfaces/login-res.interface';
import { LoginForm, RegisterForm } from '@/app/lib/interfaces/auth.interface';



export const registerRequest = async (data: RegisterForm ) =>   axios.post('/auth/signup', data);
export const loginRequest = async (data: LoginForm) => axios.post<LoginResponse>('/auth/login', data);
export const logoutRequest = async () =>  axios.post('/auth/logout');