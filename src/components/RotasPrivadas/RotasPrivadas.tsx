import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import * as Components from "../index";

export const RotaPrivada = () => {
  const { tokenAuth } = useContext(AuthContext);

  return tokenAuth ? (<Components.MenuLateral><Outlet /></Components.MenuLateral>) : <Navigate to="/"/>;
}