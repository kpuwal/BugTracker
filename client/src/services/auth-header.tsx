import { AxiosRequestHeaders } from 'axios';

export default function authHeader(): AxiosRequestHeaders {
  const token = JSON.parse(localStorage.getItem('token') || '{}') as string;
  return { 'x-access-token': token };
}
