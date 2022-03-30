import { AxiosRequestHeaders } from 'axios';
import { User } from '../types';

export default function authHeader(): AxiosRequestHeaders {
  const user = JSON.parse(localStorage.getItem('user') || '{}') as User;
  console.log("user from local storage ", user)
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
}