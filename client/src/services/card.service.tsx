import axios, { AxiosRequestConfig } from "axios";
import { CardTypes } from '../types';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_URL;

const addCard = ({title, description, createdBy, category}: CardTypes) => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.post(API_URL + "moderator/bug", {
    title,
    description,
    createdBy,
    category,
  }, requestConfig);
}

const readCards = () => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.get(API_URL + "user/bugs", requestConfig);
}

const CardService = {
  addCard,
  readCards,
}

export default CardService;