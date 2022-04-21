import axios, { AxiosRequestConfig } from "axios";
import { Card, deleteTypes } from '../types';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_URL;

const createOne = ({title, description, createdBy, category}: Card) => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.post(API_URL + "moderator/bug", {
    title,
    description,
    createdBy,
    category,
  }, requestConfig);
}

const readAll = () => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.get(API_URL + "user/bugs", requestConfig);
}

const readOne = ({_id}: deleteTypes) => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.get(API_URL + `user/bug/${_id}`, requestConfig);
}

const deleteOne = ({_id}: deleteTypes) => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.delete(API_URL + `moderator/bug/${_id}`, requestConfig);
}

const updateStatus = (card: Card) => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.put(API_URL + `user/bug/${card._id}`,card, requestConfig);
}

const updateContent = (_id: string, card: Card) => {
  const requestConfig: AxiosRequestConfig = { headers: authHeader() };
  return axios.put(API_URL + `moderator/bug/${_id}`, card, requestConfig);
}

const CardService = {
  createOne,
  readAll,
  readOne,
  updateStatus,
  updateContent,
  deleteOne,
}

export default CardService;