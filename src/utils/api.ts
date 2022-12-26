import axios from "axios";

export const API = axios.create({
  baseURL: "http://vemser-dbc.dbccompany.com.br:39000/vemser/avaliaser-back"
});

export const AuthAPI = axios.create({
  baseURL: "http://vemser-dbc.dbccompany.com.br:39000/vemser/usuario-back"
});