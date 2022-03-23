import axios, { AxiosRequestConfig } from "axios";

import authHeader from './auth-Header';

const API_URL = process.env.REACT_APP_URL;

const getUserDashboard = () => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.get(API_URL + 'user', requestConfig);
};
const getModeratorDashboard = () => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.get(API_URL + 'moderator', requestConfig);
};
const getAdminDashboard = () => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.get(API_URL + 'admin', requestConfig);
};
const userService = {
  getUserDashboard,
  getModeratorDashboard,
  getAdminDashboard,
};

export default userService;
