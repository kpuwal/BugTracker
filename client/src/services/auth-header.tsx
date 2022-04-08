import { AxiosRequestHeaders } from 'axios';
// import { TokenUser } from '../types';

export default function authHeader(): AxiosRequestHeaders {
  const token = JSON.parse(localStorage.getItem('token') || '{}') as string;
  
  // if (!token) {
  //   console.log("inside token")
    return { 'x-access-token': token };
  // } else {
  //   return {};
  // }
}