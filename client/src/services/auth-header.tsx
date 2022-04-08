import { AxiosRequestHeaders } from 'axios';

export default function authHeader(): AxiosRequestHeaders {
  const token = JSON.parse(localStorage.getItem('token') || '{}') as string;
  if (token) {
    return { 'x-access-token': token };
  } else {
    return {};
  }
}