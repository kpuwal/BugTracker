import axios, { AxiosRequestConfig } from "axios";
import { updateTypes ,deleteTypes } from '../types';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_URL;

const showUsers = () => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.get(API_URL + 'moderator/users', requestConfig);
};

const updateUser = ({_id, roles}: updateTypes) => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.put(API_URL + `admin/user`, {_id, roles}, requestConfig);
};

const deleteUser = ({_id}: deleteTypes) => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.delete(API_URL + `admin/user/${_id}`, requestConfig);
};

const userService = {
  showUsers,
  updateUser,
  deleteUser,
};

export default userService;
