import { AxiosRequestHeaders } from 'axios';
import { User } from '../types';

export default function authHeader(): AxiosRequestHeaders {
  const user = JSON.parse(localStorage.getItem('user') || '{}') as User;
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
}