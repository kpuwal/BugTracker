import axios, { AxiosRequestConfig } from "axios";
import { cardTypes } from '../types';
import authHeader from './auth-header';

const MODERATOR_API_URL = process.env.REACT_APP_MODERATOR_URL;

const addCard = ({title, description, category}: cardTypes) => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.post(MODERATOR_API_URL + "bug", {
    title,
    description,
    category,
  }, requestConfig);
}

const CardService = {
  addCard,
}

export default CardService;