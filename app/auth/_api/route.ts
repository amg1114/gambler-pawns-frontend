import axios from '@/app/_axios';
import { LoginForm, RegisterForm } from '../_interfaces';
import { AxiosResponse } from 'axios';



export const registerRequest = async (data: RegisterForm ) =>   axios.post('/auth/signup', data);
export const loginRequest = async (data: LoginForm) => axios.post('/auth/login', data);
export const logoutRequest = async () =>  axios.post('/auth/logout');
