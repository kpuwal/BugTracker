import axios, { AxiosRequestConfig } from "axios";

import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_URL;

const getDashboard = (role: string) => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  console.log("url: ", API_URL + `${role}/dashboard`)
  return axios.get(API_URL + `${role}/dashboard`, requestConfig);
};

const getUserDashboard = () => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.get(API_URL + 'user/dashboard', requestConfig);
};
// const getModeratorDashboard = () => {
//   const requestConfig: AxiosRequestConfig = { headers: authHeader() };
//   return axios.get(API_URL + 'moderator/dashboard', requestConfig);
// };
// const getAdminDashboard = () => {
//   const requestConfig: AxiosRequestConfig = { headers: authHeader() };
//   return axios.get(API_URL + 'admin/dashboard', requestConfig);
// };

const showUsers = () => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.get(API_URL + 'moderator/users', requestConfig);
};

const userService = {
  getDashboard,
  getUserDashboard,
  showUsers,
  // getModeratorDashboard,
  // getAdminDashboard,
};

export default userService;
