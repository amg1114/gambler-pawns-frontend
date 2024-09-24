import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
instance.defaults.validateStatus = (status) => status >= 200 && status <= 500;

export default instance;
