import axios from "axios";
import { authType } from '../types';

const API_URL = process.env.REACT_APP_URL;

const register = ({name, email, password}: authType) => {
  return axios.post(API_URL + "auth/register", {
    name,
    email,
    password,
  });
}

const login = ({email, password}: authType) => {
  return axios
    .post(API_URL + "auth/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
}

const logout = () => {
  localStorage.removeItem("user");
}

const authService = {
  register,
  login,
  logout,
}

export default authService;
