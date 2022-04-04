import axios, { AxiosRequestConfig } from "axios";

import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_URL;

const showUsers = () => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.get(API_URL + 'moderator/users', requestConfig);
};

const ModeratorService = {
  showUsers,
}

export default ModeratorService;