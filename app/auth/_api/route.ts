import axios from '@/app/_axios';
import { LoginForm, RegisterForm } from '../_interfaces';
import { AxiosResponse } from 'axios';



export const registerRequest = async (data: RegisterForm ): Promise<AxiosResponse<any>> =>  {return axios.post('/auth/register', data)};
export const loginRequest = async (data: LoginForm): Promise<AxiosResponse<any>> => {return axios.post('/auth/login', data)};
export const logoutRequest = async (): Promise<AxiosResponse<any>> => {return axios.post('/auth/logout')};
    
