import axios, { AxiosRequestConfig } from "axios";
import { Card, deleteTypes } from '../types';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_URL;
const requestConfig: AxiosRequestConfig = { headers: authHeader() };

const addCard = ({title, description, createdBy, category}: Card) => {
  return axios.post(API_URL + "moderator/bug", {
    title,
    description,
    createdBy,
    category,
  }, requestConfig);
}

const readCards = () => {
  return axios.get(API_URL + "user/bugs", requestConfig);
}

const deleteCard = ({_id}: deleteTypes) => {
  return axios.delete(API_URL + `moderator/bug/${_id}`, requestConfig);
}

const updateCardStatus = (card: Card) => {
  return axios.put(API_URL + `user/bug/${card._id}`,card, requestConfig);
}

const updateCardEdit = (card: Card) => {
  return axios.put(API_URL + `moderator/bug/${card._id}`, card, requestConfig);
}

const CardService = {
  addCard,
  readCards,
  deleteCard,
  updateCardStatus,
  updateCardEdit,
}

export default CardService;