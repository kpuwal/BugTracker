import axios, { AxiosRequestConfig } from "axios";

import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_URL_USER;

const getUserDashboard = () => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.get(API_URL + 'user/dashboard', requestConfig);
};
const getModeratorDashboard = () => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.get(API_URL + 'moderator/dashboard', requestConfig);
};
const getAdminDashboard = () => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.get(API_URL + 'admin/dashboard', requestConfig);
};
const userService = {
  getUserDashboard,
  getModeratorDashboard,
  getAdminDashboard,
};

export default userService;
