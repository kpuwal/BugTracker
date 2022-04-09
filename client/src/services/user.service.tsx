import axios, { AxiosRequestConfig } from "axios";
import { updateTypes ,deleteTypes } from '../types';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_URL;

const readAll = () => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.get(API_URL + 'moderator/users', requestConfig);
}

const updateRoles = ({_id, roles}: updateTypes) => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.put(API_URL + `admin/user`, {_id, roles}, requestConfig);
}

const deleteOne = ({_id}: deleteTypes) => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.delete(API_URL + `admin/user/${_id}`, requestConfig);
}

const UserService = {
  readAll,
  updateRoles,
  deleteOne,
}

export default UserService;
