import { AxiosRequestHeaders } from 'axios';
import { TokenUser } from '../types';

export default function authHeader(): AxiosRequestHeaders {
  const user = JSON.parse(localStorage.getItem('user') || '{}') as TokenUser;
  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
}