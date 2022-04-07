import axios from "axios";
import { authType } from '../types';

const API_URL = process.env.REACT_APP_URL;

const register = async ({name, email, password}: authType) => {
  return axios.post(API_URL + "auth/register", {
    name,
    email,
    password,
  });
}

const login = async ({email, password}: authType) => {
  return axios
    .post(API_URL + "auth/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("token", JSON.stringify(response.data.accessToken));
      }
      return response.data.user;
    });
}

const logout = () => {
  localStorage.removeItem("token");
}

const authService = {
  register,
  login,
  logout,
}

export default authService;
