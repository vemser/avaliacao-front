import axios from "axios";

export const API = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/vemser/avaliaser-back`,
  headers: { Authorization: localStorage.getItem("token") }
});

export const AuthAPI = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/vemser/usuario-back`,
  headers: { Authorization: localStorage.getItem("token") }
});