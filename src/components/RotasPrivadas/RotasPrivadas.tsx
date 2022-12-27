import { Outlet, Navigate } from "react-router-dom";

import * as Components from "../index";

export const RotaPrivada = () => {
  const token = localStorage.getItem('token');

  return token ? (<Components.MenuLateral><Outlet /></Components.MenuLateral>) : <Navigate to="/"/>;
}